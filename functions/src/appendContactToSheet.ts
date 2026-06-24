import {google} from "googleapis";
import * as logger from "firebase-functions/logger";

/**
 * Paste as row 1 in the tab from CONTACT_SHEET_RANGE (e.g. ContactLeads!A:O).
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
};

/**
 * Optional JSON key (e.g. local emulator). In production, prefer ADC: share the
 * sheet with the Cloud Function runtime service account and omit this.
 * @return {string} Raw JSON string or empty when unset.
 */
function getOptionalSheetsServiceAccountJson(): string {
  return process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON?.trim() ?? "";
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
  const spreadsheetId = process.env.CONTACT_SHEET_SPREADSHEET_ID?.trim();
  const range = process.env.CONTACT_SHEET_RANGE?.trim();
  const jsonRaw = getOptionalSheetsServiceAccountJson();

  if (!spreadsheetId || !range) {
    logger.info(
      "Sheets append skipped: CONTACT_SHEET_SPREADSHEET_ID or " +
        "CONTACT_SHEET_RANGE not set"
    );
    return;
  }

  const scopes = ["https://www.googleapis.com/auth/spreadsheets"];

  let auth;
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
    auth = new google.auth.GoogleAuth({credentials, scopes});
  } else {
    auth = new google.auth.GoogleAuth({scopes});
  }

  const sheets = google.sheets({version: "v4", auth});

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
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    // RAW avoids Sheets interpreting "+44 ..." as a broken formula (#ERROR!).
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {values},
  });
}
