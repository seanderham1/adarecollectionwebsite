import { onRequest } from "firebase-functions/v2/https";
import { defineSecret, defineString } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import express from "express";
import cors from "cors";

import nodemailer from "nodemailer";

/** Binds Secret Manager; value is available at runtime as `process.env.GMAIL_APP_PASSWORD`. */
const gmailAppPassword = defineSecret("GMAIL_APP_PASSWORD");

/**
 * SMTP login username. Must equal the Google account that owns the App Password,
 * normally the same as the sending address — set when `info@` is an alias and
 * login is something like user@yourdomain.com via `functions/.env.<PROJECT_ID>` or deploy params.
 */
const gmailSmtpUser = defineString("GMAIL_SMTP_USER", {
  default: "info@theadarecollection.ie",
});

/** Shown as From / To on notifications; inbox that should receive enquiries. */
const GMAIL_FROM_ADDRESS = "info@theadarecollection.ie";

function getSmtpAuthUsername(): string {
  const explicit = process.env.GMAIL_SMTP_USER?.trim();
  if (explicit) return explicit;
  try {
    return gmailSmtpUser.value().trim();
  } catch {
    return GMAIL_FROM_ADDRESS;
  }
}

function normalizeGmailAppPassword(raw: string): string {
  /** Google shows app passwords as four groups; pasted value may include spaces. */
  return raw.replace(/\s+/g, "").trim();
}

/** Prefer env (injected from Secret Manager); fall back to `.value()` per Firebase params. */
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

const GUEST_LABELS: Record<string, string> = {
  "2-4": "2–4",
  "5-8": "5–8",
  "9-12": "9–12",
  "13-plus": "13+",
};

const INTENDED_LABELS: Record<string, string> = {
  accommodation_only: "Accommodation only",
  accommodation_hosting: "Accommodation with executive hosting / hospitality",
};

const PROGRAMME_LABELS: Record<string, string> = {
  exploring: "Exploring options",
  actively_planning_ryder_2027: "Actively planning for Ryder Cup 2027",
  ready_to_secure: "Ready to secure accommodation",
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

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Add this middleware to log all requests
app.use((req, res, next) => {
  logger.info(`Request path: ${req.path}, URL: ${req.url}, method: ${req.method}`);
  next();
});

// Access request submission endpoint
app.post("/api/access-request", async (req, res) => {
  try {
    const { email, name, reason } = req.body;

    // Validate required fields
    if (!email || !email.includes('@')) {
      return res.status(400).json({ 
        success: false, 
        message: "Valid email address is required" 
      });
    }

    let transporter: nodemailer.Transporter;
    try {
      transporter = createGmailTransport();
    } catch (err) {
      logger.error("Gmail credentials missing for access-request", err);
      return res.status(500).json({
        success: false,
        message: "Email configuration error. Please contact support.",
      });
    }

    const mailOptions = {
      from: GMAIL_FROM_ADDRESS,
      to: GMAIL_FROM_ADDRESS,
      subject: 'New Access Request - The Adare Collection Website',
      html: `
        <h2>New Website Access Request</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Reason for Access:</strong> ${reason || 'Not provided'}</p>
        <p><strong>Request Date:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p><strong>To grant access:</strong></p>
        <p>Reply to this email with the access code: <code>access345</code></p>
        <p>Or send a custom message to the requester.</p>
        <hr>
        <p><em>This access request was submitted from the Adare Collection website.</em></p>
        <p>The Adare Collection Limited</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    logger.info(`Access request submitted by ${email}`);
    
    return res.json({ 
      success: true, 
      message: "Access request submitted successfully. We'll review your request and contact you soon." 
    });
    
  } catch (error) {
    logger.error('Error processing access request:', error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to submit access request. Please try again or contact us directly." 
    });
  }
});

// Contact form submission endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const body = req.body ?? {};

    const name = String(body.name ?? "").trim();
    const emailRaw = String(body.email ?? "").trim();
    const extension = String(body.extension ?? body.phoneExtension ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const enquiryType = String(body.enquiryType ?? "").trim();
    const organisationName = String(body.organisationName ?? "").trim();
    const rolePosition = String(body.rolePosition ?? "").trim();
    const estimatedGuests = String(body.estimatedGuests ?? "").trim();
    const intendedUse = String(body.intendedUse ?? "").trim();
    const programmeStatus = String(body.programmeStatus ?? "").trim();
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

    const validGuests = ["2-4", "5-8", "9-12", "13-plus"];
    if (!validGuests.includes(estimatedGuests)) {
      return res.status(400).json({
        success: false,
        message: "Please select an estimated guest range.",
      });
    }

    const validIntended = ["accommodation_only", "accommodation_hosting"];
    if (!validIntended.includes(intendedUse)) {
      return res.status(400).json({
        success: false,
        message: "Please select intended use of the property.",
      });
    }

    const validProgramme = [
      "exploring",
      "actively_planning_ryder_2027",
      "ready_to_secure",
    ];
    if (!validProgramme.includes(programmeStatus)) {
      return res.status(400).json({
        success: false,
        message: "Please describe your programme status.",
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
    const guestsReadable = GUEST_LABELS[estimatedGuests] ?? estimatedGuests;
    const intendedReadable = INTENDED_LABELS[intendedUse] ?? intendedUse;
    const programmeReadable = PROGRAMME_LABELS[programmeStatus] ?? programmeStatus;

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
      "New contact inquiry — The Adare Collection",
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
      `Programme status: ${programmeReadable}`,
      `Previously organised major event accommodation: ${prevReadable}`,
      `Budget: ${budgetReadable}`,
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
        <p><strong>Programme status:</strong> ${escapeHtml(programmeReadable)}</p>
        <p><strong>Previously organised major event accommodation:</strong> ${escapeHtml(prevReadable)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budgetReadable)}</p>
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

    logger.info(`Contact form submitted by ${emailRaw}`);

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

// Add a catch-all to see what paths are being requested
app.get("*", (req, res) => {
  logger.info(`Unmatched path: ${req.path}, URL: ${req.url}`);
  res.json({ 
    path: req.path, 
    url: req.url, 
    message: "Debug info - this path was not matched",
    availableRoutes: ["/hello", "/api/hello", "/api/contact", "/api/access-request"]
  });
});

// Gen-2: `gmailAppPassword` wires Secret Manager so `GMAIL_APP_PASSWORD` is available at runtime.
export const api = onRequest(
  {
    region: "us-central1",
    memory: "256MiB",
    timeoutSeconds: 60,
    cors: true,
    secrets: [gmailAppPassword],
  },
  app
);

