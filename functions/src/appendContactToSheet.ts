import {google} from "googleapis";
import * as logger from "firebase-functions/logger";

/**
 * Paste as row 1 in the tab from CONTACT_SHEET_RANGE (e.g. ContactLeads!A:R).
 * Appends add rows after existing data; keep this header at the top.
 */
export const CONTACT_LEADS_HEADER_ROW = [
  "Submitted (UTC)",
  "Full name",
  "Email",
  "International dialling code",
  "Phone (national number)",
  "Phone (combined)",
  "Enquiry type",
  "Organisation / company",
  "Role / position",
  "Estimated guests",
  "Intended use",
  "Previously organised major event accommodation",
  "Budget",
  "Preferred properties",
  "Additional notes",
  "Privacy consent",
  "Consent timestamp (UTC)",
  "Privacy policy version",
] as const;

export type ContactSheetRowInput = {
  submittedAt: string;
  name: string;
  email: string;
  extensionReadable: string;
  phone: string;
  phoneDisplay: string;
  enquiryReadable: string;
  organisationName: string;
  rolePosition: string;
  guestsReadable: string;
  intendedReadable: string;
  prevReadable: string;
  budgetReadable: string;
  preferredPropertiesCell: string;
  additionalNotes: string;
  privacyConsent: string;
  consentTimestamp: string;
  privacyPolicyVersion: string;
};

const SHEETS_SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

/**
 * Optional JSON key (e.g. local emulator). In production, prefer ADC: share the
 * sheet with the Cloud Function runtime service account and omit this.
 * @return {string} Raw JSON string or empty when unset.
 */
function getOptionalSheetsServiceAccountJson(): string {
  return process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON?.trim() ?? "";
}

function getSheetsAuth() {
  const jsonRaw = getOptionalSheetsServiceAccountJson();
  if (jsonRaw) {
    let credentials: Record<string, unknown>;
    try {
      credentials = JSON.parse(jsonRaw) as Record<string, unknown>;
    } catch {
      logger.error(
        "Sheets append failed: GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON is not " +
          "valid JSON"
      );
      throw new Error("Invalid GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON");
    }
    return new google.auth.GoogleAuth({credentials, scopes: SHEETS_SCOPES});
  }
  return new google.auth.GoogleAuth({scopes: SHEETS_SCOPES});
}

function getSheetConfig(): {spreadsheetId: string; range: string} | null {
  const spreadsheetId = process.env.CONTACT_SHEET_SPREADSHEET_ID?.trim();
  const range = process.env.CONTACT_SHEET_RANGE?.trim();
  if (!spreadsheetId || !range) return null;
  return {spreadsheetId, range};
}

/**
 * Appends one row to the configured spreadsheet. No-ops with a log when
 * spreadsheet env is missing. Uses Application Default Credentials when no
 * inline JSON is set (normal for Cloud Functions Gen 2).
 * @param {ContactSheetRowInput} row Values aligned with
 *     CONTACT_LEADS_HEADER_ROW.
 * @return {Promise<void>} Resolves when append completes or is skipped.
 */
export async function appendContactToSheet(
  row: ContactSheetRowInput
): Promise<void> {
  const config = getSheetConfig();
  if (!config) {
    logger.info(
      "Sheets append skipped: CONTACT_SHEET_SPREADSHEET_ID or " +
        "CONTACT_SHEET_RANGE not set"
    );
    return;
  }

  const sheets = google.sheets({version: "v4", auth: getSheetsAuth()});

  const values: string[][] = [
    [
      row.submittedAt,
      row.name,
      row.email,
      row.extensionReadable,
      row.phone,
      row.phoneDisplay,
      row.enquiryReadable,
      row.organisationName,
      row.rolePosition,
      row.guestsReadable,
      row.intendedReadable,
      row.prevReadable,
      row.budgetReadable,
      row.preferredPropertiesCell,
      row.additionalNotes,
      row.privacyConsent,
      row.consentTimestamp,
      row.privacyPolicyVersion,
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.spreadsheetId,
    range: config.range,
    // RAW avoids Sheets interpreting "+44 ..." as a broken formula (#ERROR!).
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {values},
  });
}

const RETENTION_MONTHS = 24;

function isOlderThanRetention(submittedAt: string, cutoff: Date): boolean {
  const parsed = Date.parse(submittedAt);
  if (Number.isNaN(parsed)) return false;
  return parsed < cutoff.getTime();
}

/**
 * Deletes ContactLeads rows whose submission date is older than 24 months.
 * Unparseable dates are left in place so nothing is deleted by accident.
 * @return {Promise<number>} Number of data rows deleted.
 */
export async function purgeExpiredContactLeads(): Promise<number> {
  const config = getSheetConfig();
  if (!config) {
    logger.info(
      "Sheets purge skipped: CONTACT_SHEET_SPREADSHEET_ID or " +
        "CONTACT_SHEET_RANGE not set"
    );
    return 0;
  }

  const sheets = google.sheets({version: "v4", auth: getSheetsAuth()});
  const {spreadsheetId, range} = config;
  const tabTitle = range.split("!")[0].replace(/'/g, "");

  const [valuesRes, metaRes] = await Promise.all([
    sheets.spreadsheets.values.get({spreadsheetId, range}),
    sheets.spreadsheets.get({spreadsheetId}),
  ]);

  const sheet = metaRes.data.sheets?.find(
    (s) => s.properties?.title === tabTitle
  );
  const sheetId = sheet?.properties?.sheetId;
  if (typeof sheetId !== "number") {
    throw new Error(`Could not resolve sheetId for tab ${tabTitle}`);
  }

  const rows = valuesRes.data.values ?? [];
  if (rows.length <= 1) return 0;

  const cutoff = new Date();
  cutoff.setUTCMonth(cutoff.getUTCMonth() - RETENTION_MONTHS);

  const expiredRowIndexes: number[] = [];
  for (let i = 1; i < rows.length; i++) {
    const submittedAt = String(rows[i]?.[0] ?? "");
    if (isOlderThanRetention(submittedAt, cutoff)) {
      expiredRowIndexes.push(i);
    }
  }

  if (expiredRowIndexes.length === 0) return 0;

  expiredRowIndexes.sort((a, b) => b - a);
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: expiredRowIndexes.map((rowIndex) => ({
        deleteDimension: {
          range: {
            sheetId,
            dimension: "ROWS",
            startIndex: rowIndex,
            endIndex: rowIndex + 1,
          },
        },
      })),
    },
  });

  logger.info(
    `Purged ${expiredRowIndexes.length} contact lead row(s) older than ${RETENTION_MONTHS} months`
  );
  return expiredRowIndexes.length;
}
