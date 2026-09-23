import { onRequest } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { defineSecret } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import express from "express";
import cors from "cors";
import type { Request } from "express";

import nodemailer from "nodemailer";

import {
  appendContactToSheet,
  purgeExpiredContactLeads,
} from "./appendContactToSheet.js";
import { PRIVACY_POLICY_VERSION } from "./privacyPolicy.js";

/** Binds Secret Manager; value is available at runtime as `process.env.GMAIL_APP_PASSWORD`. */
const gmailAppPassword = defineSecret("GMAIL_APP_PASSWORD");

/**
 * SMTP login username: must be the Google account that owns the App Password.
 * Defaults to the notification inbox. Override via Cloud Functions env `GMAIL_SMTP_USER`
 * (Firebase Console) if `info@` is only “Send mail as” and login is a workspace primary user.
 */
const GMAIL_FROM_ADDRESS = "info@theadarecollection.ie";

function getSmtpAuthUsername(): string {
  const explicit = process.env.GMAIL_SMTP_USER?.trim();
  if (explicit) return explicit;
  return GMAIL_FROM_ADDRESS;
}

function normalizeGmailAppPassword(raw: string): string {
  /** Google shows app passwords as four groups; pasted value may include spaces. */
  return raw.replace(/\s+/g, "").trim();
}

/** Prefer env (injected from Secret Manager at runtime); `fromSecret` from wired secret param during deploy analysis. */
function getGmailAppPassword(): string {
  const fromEnv = process.env.GMAIL_APP_PASSWORD ?? "";
  let fromSecret = "";
  try {
    fromSecret = gmailAppPassword.value() ?? "";
  } catch {
    // Emulator / analysis without secret wiring
  }
  return normalizeGmailAppPassword(fromEnv || fromSecret);
}

function createGmailTransport() {
  const pass = getGmailAppPassword();
  if (!pass) {
    throw new Error("GMAIL_APP_PASSWORD is not configured");
  }
  const smtpUser = getSmtpAuthUsername();
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass,
    },
  });
}

function escapeHtml(value: unknown): string {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function nl2br(value: string): string {
  return escapeHtml(value).replace(/\r\n/g, "\n").replace(/\n/g, "<br>");
}

const ENQUIRY_LABELS: Record<string, string> = {
  private_individual: "Private individual",
  corporate: "Corporate / company",
  agency: "Agency / representative",
};

/** Must stay in sync with contact form GUESTS_MIN / GUESTS_MAX. */
const GUESTS_MIN = 1;
const GUESTS_MAX = 16;

function formatGuests(n: number): string {
  if (n >= GUESTS_MAX) return `${GUESTS_MAX}+`;
  return String(n);
}

const INTENDED_LABELS: Record<string, string> = {
  accommodation_only: "Accommodation only",
  accommodation_hosting: "Accommodation with executive hosting / hospitality",
};

/** Must stay in sync with contact form PHONE_DIAL_OPTIONS values. */
const VALID_PHONE_EXTENSIONS = new Set([
  "+1",
  "+44",
  "+49",
  "+33",
  "+39",
  "+34",
  "+31",
  "+32",
  "+41",
  "+43",
  "+353",
  "+61",
  "+64",
  "+86",
  "+81",
  "+82",
  "+91",
  "+92",
  "+880",
  "+62",
  "+63",
  "+65",
  "+60",
  "+66",
  "+84",
  "+55",
  "+52",
  "+54",
  "+27",
  "+234",
  "none",
]);

const FUNCTION_REGION = "europe-west1";

const ALLOWED_ORIGINS = [
  "https://theadarecollection.com",
  "https://www.theadarecollection.com",
  "https://theadarecollection-site.web.app",
  "https://theadarecollection-site.firebaseapp.com",
  "http://localhost:5000",
  "http://localhost:5173",
  "http://127.0.0.1:5000",
  "http://127.0.0.1:5173",
];

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  return /^https:\/\/theadarecollection-site--[a-z0-9-]+\.web\.app$/.test(origin);
}

const CONTACT_RATE_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_RATE_MAX = 8;
const contactHits = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(",")[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || "unknown";
}

function isContactRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (contactHits.get(ip) ?? []).filter(
    (t) => now - t < CONTACT_RATE_WINDOW_MS
  );
  if (recent.length >= CONTACT_RATE_MAX) {
    contactHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  contactHits.set(ip, recent);
  return false;
}

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
  })
);
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Request path: ${req.path}, method: ${req.method}`);
  next();
});

// Contact form submission endpoint
app.post("/api/contact", async (req, res) => {
  try {
    if (isContactRateLimited(getClientIp(req))) {
      return res.status(429).json({
        success: false,
        message: "Too many enquiries from this network. Please try again later.",
      });
    }

    const body = req.body ?? {};

    const name = String(body.name ?? "").trim();
    const emailRaw = String(body.email ?? "").trim();
    const extension = String(body.extension ?? body.phoneExtension ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const enquiryType = String(body.enquiryType ?? "").trim();
    const organisationName = String(body.organisationName ?? "").trim();
    const rolePosition = String(body.rolePosition ?? "").trim();
    const estimatedGuests = Number(body.estimatedGuests);
    const intendedUse = String(body.intendedUse ?? "").trim();
    const prevEvent = body.previousMajorEventAccommodation;
    const budgetEurosThousands = Number(body.budgetEurosThousands);
    const budgetLabel = String(body.budgetLabel ?? "").trim();
    const preferredPropertyIds: string[] = Array.isArray(body.preferredPropertyIds)
      ? body.preferredPropertyIds.map((x: unknown) => String(x))
      : [];
    const preferredPropertiesSummary: string[] = Array.isArray(
      body.preferredPropertiesSummary
    )
      ? body.preferredPropertiesSummary.map((x: unknown) => String(x))
      : [];
    const additionalNotes = String(
      body.additionalNotes ?? body.message ?? ""
    ).trim();

    if (!name || !emailRaw || !phone) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and phone number are required.",
      });
    }

    if (!extension || !VALID_PHONE_EXTENSIONS.has(extension)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid international dialling code.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const validEnquiry = ["private_individual", "corporate", "agency"];
    if (!validEnquiry.includes(enquiryType)) {
      return res.status(400).json({
        success: false,
        message: "Please select how you are enquiring.",
      });
    }

    if (enquiryType === "corporate" || enquiryType === "agency") {
      if (!organisationName || !rolePosition) {
        return res.status(400).json({
          success: false,
          message: "Organisation and role are required for your enquiry type.",
        });
      }
    }

    if (
      !Number.isFinite(estimatedGuests) ||
      !Number.isInteger(estimatedGuests) ||
      estimatedGuests < GUESTS_MIN ||
      estimatedGuests > GUESTS_MAX
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid estimated number of guests.",
      });
    }

    const validIntended = ["accommodation_only", "accommodation_hosting"];
    if (!validIntended.includes(intendedUse)) {
      return res.status(400).json({
        success: false,
        message: "Please select intended use of the property.",
      });
    }

    if (
      prevEvent != null &&
      prevEvent !== "" &&
      prevEvent !== "yes" &&
      prevEvent !== "no"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid value for previous event experience.",
      });
    }

    if (
      !Number.isFinite(budgetEurosThousands) ||
      budgetEurosThousands < 50 ||
      budgetEurosThousands > 1000
    ) {
      return res.status(400).json({
        success: false,
        message: "Budget range is invalid.",
      });
    }

    if (body.privacyConsentAccepted !== true) {
      return res.status(400).json({
        success: false,
        message:
          "Please confirm your consent for us to process your enquiry as described in our Privacy Policy.",
      });
    }

    if (preferredPropertyIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one property.",
      });
    }

    let transporter: nodemailer.Transporter;
    try {
      transporter = createGmailTransport();
    } catch (err) {
      logger.error("Gmail credentials missing for contact", err);
      return res.status(500).json({
        success: false,
        message: "Email configuration error. Please contact support.",
      });
    }

    const enquiryReadable = ENQUIRY_LABELS[enquiryType] ?? enquiryType;
    const guestsReadable = formatGuests(estimatedGuests);
    const intendedReadable = INTENDED_LABELS[intendedUse] ?? intendedUse;

    let prevReadable = "Not specified";
    if (prevEvent === "yes") prevReadable = "Yes";
    if (prevEvent === "no") prevReadable = "No";

    const budgetReadable =
      budgetLabel ||
      (budgetEurosThousands >= 1000 ? "€1M+" : `€${budgetEurosThousands}k`);

    const phoneDisplay =
      extension === "none" ? phone : `${extension} ${phone}`.trim();

    const propertiesBlock =
      preferredPropertiesSummary.length > 0
        ? preferredPropertiesSummary.map((p) => `<li>${escapeHtml(p)}</li>`).join("")
        : preferredPropertyIds.length > 0
          ? preferredPropertyIds
              .map((id) => `<li>${escapeHtml(id)}</li>`)
              .join("")
          : "<li>None selected</li>";

    const orgBlock =
      enquiryType === "corporate" || enquiryType === "agency"
        ? `
        <p><strong>Organisation / company:</strong> ${escapeHtml(organisationName)}</p>
        <p><strong>Role / position:</strong> ${escapeHtml(rolePosition)}</p>`
        : "";

    const extensionReadable =
      extension === "none" ? "Other / not listed" : extension;

    const propertiesTextLines =
      preferredPropertiesSummary.length > 0
        ? preferredPropertiesSummary.map((p) => `  • ${p}`).join("\n")
        : preferredPropertyIds.length > 0
          ? preferredPropertyIds.map((id) => `  • ${id}`).join("\n")
          : "  (none selected)";

    const submittedAt = new Date().toISOString();

    const textBody = [
      "New contact inquiry - The Adare Collection",
      "",
      `Submitted (UTC): ${submittedAt}`,
      "",
      `Full name: ${name}`,
      `Email: ${emailRaw}`,
      `International dialling code: ${extensionReadable}`,
      `Phone (national number): ${phone}`,
      `Phone (combined): ${phoneDisplay}`,
      `Enquiry type: ${enquiryReadable}`,
      ...(enquiryType === "corporate" || enquiryType === "agency"
        ? [
            `Organisation / company: ${organisationName}`,
            `Role / position: ${rolePosition}`,
          ]
        : []),
      `Estimated guests: ${guestsReadable}`,
      `Intended use: ${intendedReadable}`,
      `Previously organised major event accommodation: ${prevReadable}`,
      `Budget: ${budgetReadable}`,
      "Privacy consent (enquiry processing): confirmed at submission",
      `Privacy policy version: ${PRIVACY_POLICY_VERSION}`,
      "",
      "Preferred properties:",
      propertiesTextLines,
      "",
      "Additional notes:",
      additionalNotes || "(none)",
      "",
      "---",
      "This inquiry was submitted from the Adare Collection website.",
      "The Adare Collection Limited",
    ].join("\n");

    const mailOptions = {
      from: GMAIL_FROM_ADDRESS,
      to: GMAIL_FROM_ADDRESS,
      subject: "New Contact Inquiry - The Adare Collection",
      text: textBody,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Submitted (UTC):</strong> ${escapeHtml(submittedAt)}</p>
        <p><strong>Full name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(emailRaw)}</p>
        <p><strong>International dialling code:</strong> ${escapeHtml(extensionReadable)}</p>
        <p><strong>Phone (national number):</strong> ${escapeHtml(phone)}</p>
        <p><strong>Phone (combined):</strong> ${escapeHtml(phoneDisplay)}</p>
        <p><strong>Enquiry type:</strong> ${escapeHtml(enquiryReadable)}</p>
        ${orgBlock}
        <p><strong>Estimated guests:</strong> ${escapeHtml(guestsReadable)}</p>
        <p><strong>Intended use:</strong> ${escapeHtml(intendedReadable)}</p>
        <p><strong>Previously organised major event accommodation:</strong> ${escapeHtml(prevReadable)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budgetReadable)}</p>
        <p><strong>Privacy consent (enquiry):</strong> Confirmed at submission</p>
        <p><strong>Privacy policy version:</strong> ${escapeHtml(PRIVACY_POLICY_VERSION)}</p>
        <p><strong>Preferred properties:</strong></p>
        <ul>${propertiesBlock}</ul>
        <p><strong>Additional notes:</strong></p>
        <p>${additionalNotes ? nl2br(additionalNotes) : "<em>None</em>"}</p>
        <hr>
        <p><em>This inquiry was submitted from the Adare Collection website.</em></p>
        <p>The Adare Collection Limited</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    const autoReplyText = [
      `Dear ${name},`,
      "",
      "Thank you for contacting us at The Adare Collection. We have received your enquiry and will be in touch shortly.",
      "",
      "Kind regards,",
      "The Adare Collection",
      GMAIL_FROM_ADDRESS,
    ].join("\n");

    try {
      await transporter.sendMail({
        from: GMAIL_FROM_ADDRESS,
        to: emailRaw,
        replyTo: GMAIL_FROM_ADDRESS,
        subject: "Thank you for contacting The Adare Collection",
        text: autoReplyText,
        html: `
          <p>Dear ${escapeHtml(name)},</p>
          <p>Thank you for contacting us at The Adare Collection. We have received your enquiry and will be in touch shortly.</p>
          <p>Kind regards,<br>
          The Adare Collection<br>
          <a href="mailto:${escapeHtml(GMAIL_FROM_ADDRESS)}">${escapeHtml(GMAIL_FROM_ADDRESS)}</a></p>
        `,
      });
    } catch (autoReplyErr) {
      logger.error(
        "Contact inquiry received but guest auto-reply failed",
        autoReplyErr
      );
    }

    let preferredPropertiesCell = "";
    if (preferredPropertiesSummary.length > 0) {
      preferredPropertiesCell = preferredPropertiesSummary.join("; ");
    } else if (preferredPropertyIds.length > 0) {
      preferredPropertiesCell = preferredPropertyIds.join("; ");
    }

    try {
      await appendContactToSheet({
        submittedAt,
        name,
        email: emailRaw,
        extensionReadable,
        phone,
        phoneDisplay,
        enquiryReadable,
        organisationName:
          enquiryType === "corporate" || enquiryType === "agency"
            ? organisationName
            : "",
        rolePosition:
          enquiryType === "corporate" || enquiryType === "agency"
            ? rolePosition
            : "",
        guestsReadable,
        intendedReadable,
        prevReadable,
        budgetReadable,
        preferredPropertiesCell,
        additionalNotes,
        privacyConsent: "Yes",
        consentTimestamp: submittedAt,
        privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      });
    } catch (sheetErr) {
      logger.error(
        "Contact inquiry email sent but Google Sheets append failed",
        sheetErr
      );
    }

    logger.info("Contact form submitted");

    return res.json({
      success: true,
      message: "Thank you for your inquiry. We will contact you within 24 hours.",
    });
  } catch (error) {
    const e = error as {
      message?: string;
      responseCode?: number;
      response?: string;
      code?: string;
    };
    logger.error("Error sending contact email", {
      message: e.message,
      code: e.code,
      responseCode: e.responseCode,
      response: e.response?.substring(0, 500),
    });
    return res.status(500).json({
      success: false,
      message: "Failed to send inquiry. Please try again or contact us directly.",
    });
  }
});

app.get("/hello", (_req, res) => {
  logger.info("hello endpoint hit");
  res.json({ ok: true, message: "Hello from Firebase Functions (Gen 2)!" });
});

// Add this new route to handle the /api/hello path
app.get("/api/hello", (_req, res) => {
  logger.info("api/hello endpoint hit");
  res.json({ ok: true, message: "Hello from Firebase Functions (Gen 2) via /api/hello!" });
});

// Gen-2: `gmailAppPassword` wires Secret Manager so `GMAIL_APP_PASSWORD` is available at runtime.
export const api = onRequest(
  {
    region: FUNCTION_REGION,
    memory: "256MiB",
    timeoutSeconds: 60,
    cors: ALLOWED_ORIGINS,
    secrets: [gmailAppPassword],
  },
  app
);

export const purgeExpiredContactLeadsJob = onSchedule(
  {
    region: FUNCTION_REGION,
    schedule: "0 4 1 * *",
    timeZone: "Europe/Dublin",
  },
  async () => {
    const deleted = await purgeExpiredContactLeads();
    logger.info(`Scheduled contact-lead purge finished; rows deleted: ${deleted}`);
  }
);

