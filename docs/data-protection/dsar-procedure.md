# Data Subject Rights Procedure (Access, Erasure, and related requests)

**Controller:** The Adare Collection Limited  
**Effective:** 9 September 2026  
**Primary mailbox:** info@theadarecollection.ie  
**Related:** [data-protection-audit.md](./data-protection-audit.md)

There is no admin application. Enquiry personal data lives in a Google Sheet and in email. This runbook is how staff fulfil GDPR rights without missing a copy.

Statutory deadline: **one month** from receipt (GDPR Article 12(3)). Clock starts when the request is received at info@ (or any company mailbox — forward it the same day). You may extend by two further months for complex or numerous requests, but you must tell the person within the first month and explain why.

Do **not** charge a fee except for manifestly unfounded or excessive requests, and take legal advice before refusing.

---

## 1. Intake

1. Create a tracker row: date received, requester name, email, type of request (access / erasure / rectification / restriction / objection / portability / withdraw consent), deadline = received + 30 calendar days.
2. Acknowledge by email: “We have received your request and will respond within 30 days.”
3. **Verify identity.** For an enquiry, matching the request to the email address already on the Sheet is usually enough. If the request comes from a different address, ask a reasonable follow-up (e.g. the phone number used on the form, or a copy of the auto-reply). Do not collect extra ID documents unless there is a real impersonation risk.
4. Do not fulfil a request by sending the **entire** lead sheet. Export only that person’s rows.

---

## 2. Where to search (every request)

Search **all** of the following. Tick them off in the tracker.

| Location | How |
|---|---|
| Google Sheet `ContactLeads` | Filter Email column (and Full name). Include rows with typos if they are clearly the same person. |
| info@theadarecollection.ie | Gmail search: requester email, name, phone. Include Sent, Spam, and any enquiry labels. |
| dylan@theadarecollection.ie | Same search. Staff follow-up often lives here. |
| Downloads / local files | Ask anyone with sheet access whether they exported a CSV or copied rows. If yes, search those copies. |
| Owners / suppliers | Only if this enquiry was already forwarded onward. If it was, you must include that copy in the search and, for erasure, ask them to delete it. |

Cloud Logging does not store enquirer emails after the 9 September 2026 remediation. Do not promise that older logs have been purged; default retention is about 30 days.

---

## 3. Access (Article 15)

Provide:

- The personal data you hold (Sheet row(s) as a PDF or CSV **of their rows only**, plus copies of emails that are about them, with other people’s data redacted)
- The purposes, categories, recipients (Google as processor; owners/suppliers if shared), retention (24 months for enquiries; 7 years if a booking exists), and the source (the website form)
- A reminder of their other rights and the right to complain to the Data Protection Commission
- The Privacy Policy version if the Sheet column is populated

Do not include internal legal advice or other people’s enquiries.

**Portability (Article 20):** for data they provided on the form, a CSV of their Sheet row is an acceptable structured format.

---

## 4. Rectification (Article 16)

Correct the Sheet cells. Send a short confirmation. If the wrong data was forwarded to an owner or supplier, send them the correction.

---

## 5. Erasure (Article 17)

**Enquiry that never became a booking** (typical website case):

1. Delete the Sheet row(s).
2. Delete or permanently trash the notification email, auto-reply thread, and follow-up threads in info@ and dylan@ (Gmail: delete, then Empty Trash, or use Google Vault rules if enabled).
3. Delete local exports.
4. If shared with an owner or supplier, write to them asking them to delete and to confirm.
5. Confirm to the requester what was deleted. Say if something is kept (see below).

**Do not erase** if a booking proceeded and you still need the data for the contract, a legal claim, or the 7-year accounting retention. Explain which data you keep, why, and when it will be deleted. You can still erase marketing-style notes that are not needed for those purposes.

**Withdraw consent** for an open enquiry: treat as erasure of the enquiry unless you have a separate basis (e.g. an active booking). Cookie consent is withdrawn by the visitor in Cookie settings; you cannot remotely clear their browser.

---

## 6. Restriction and objection (Articles 18 and 21)

Mark the Sheet row (for example add a note in Additional notes: `PROCESSING RESTRICTED — [date]`) and stop outreach except for storage. For objection to legitimate-interests processing of logs, explain that hosting logs are short-lived and not used for profiling.

---

## 7. Mailbox retention (manual 24-month rule)

The scheduled job **only** deletes Google Sheet rows. It cannot safely auto-delete Gmail.

**On the 1st of each quarter**, the person responsible for data protection (or a named deputy) should:

1. Search info@ and dylan@ for enquiry correspondence older than 24 months that is **not** tied to a completed or in-progress booking.
2. Delete those threads (and empty Trash).
3. Record the date of the sweep in an internal log (not on the public site).

Until that habit exists, mailbox copies may outlive the Sheet. That is a residual compliance gap; the quarterly sweep closes it.

---

## 8. Response letter — short checklist

- [ ] Identity verified  
- [ ] Sheet searched  
- [ ] info@ searched  
- [ ] dylan@ searched  
- [ ] Local copies asked about  
- [ ] Owners/suppliers if previously shared  
- [ ] Reply sent within 30 days  
- [ ] Tracker closed with what was provided or deleted  

If refusing (manifestly unfounded, or legal exemption), say so plainly, cite the reason, and mention the DPC.
