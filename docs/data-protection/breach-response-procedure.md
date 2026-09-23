# Personal Data Breach Response Procedure

**Controller:** The Adare Collection Limited  
**Effective:** 9 September 2026  
**Related:** [data-protection-audit.md](./data-protection-audit.md), [dsar-procedure.md](./dsar-procedure.md)

GDPR Article 33 requires notification to the Data Protection Commission **without undue delay and, where feasible, not later than 72 hours** after becoming aware of a personal data breach, unless the breach is unlikely to result in a risk to individuals. Article 34 requires communication to affected individuals where the breach is likely to result in a **high risk**.

This procedure exists because there is no outsourced SOC and no dedicated DPO. The person who first notices the incident owns the clock until they hand it to whoever monitors info@theadarecollection.ie.

---

## 1. What counts as a breach

A personal data breach is a security incident leading to accidental or unlawful **destruction, loss, alteration, unauthorised disclosure of, or access to**, personal data. Examples for this business:

- Google Sheet `ContactLeads` shared with “anyone with the link”, or shared with the wrong person
- info@ or dylan@ mailbox compromised (phishing, stolen password, missing 2FA)
- Cloud Function or SMTP credentials leaked
- Laptop with a downloaded spreadsheet lost or stolen
- Enquiry data pasted into a personal WhatsApp, personal Gmail, or an unapproved tool
- Ransomware or a vendor (Google) notifying you of unauthorised access
- A staff member sending an enquiry pack to the wrong owner or supplier

Near misses (caught before disclosure) should still be logged.

---

## 2. Immediate actions (hour 0–4)

1. **Contain.** Revoke sharing links; reset Workspace passwords; disable a leaked API key; remove a forwarded mailbox rule you did not create. Do not wipe logs you may need.
2. **Record the time you became aware.** The 72-hour clock starts then, not when the incident began.
3. **Tell the person responsible for data protection** and the company directors. If they are unreachable, continue the procedure — do not wait out the 72 hours.
4. **Open a row in the breach register** (template below). Assign a short reference (e.g. `BR-2026-001`).
5. **Preserve evidence.** Do not delete the Sheet, emails, or Cloud logs until advised. Export sharing history / login activity if Google Admin shows it.

Do not issue a public statement or contact enquirers until the responsible person has decided notification is required.

---

## 3. Assess risk (hour 4–24)

Answer, in writing in the register:

| Question | Why it matters |
|---|---|
| What data was involved? | Names, emails, phones, budgets, free-text notes |
| How many people? | One row vs the whole sheet |
| Who has it now? | Unknown internet vs one mistaken colleague |
| Can we recover or contain it? | Link revoked vs data already copied |
| Sensitive content in notes? | Health, children, politics if volunteered |
| Likely harm? | Spam, fraud, distress, competitive disclosure of corporate plans |

**Unlikely to result in a risk** (example: encrypted device recovered immediately, no evidence of access) → document the decision **not** to notify the DPC, and still log it.

**Risk to individuals** → notify the DPC within 72 hours.

**High risk** (e.g. full sheet published, mailbox used to phish guests) → notify the DPC **and** affected individuals without undue delay.

If you cannot complete the assessment in 72 hours, notify the DPC with what you know and mark the report as incomplete, then follow up.

---

## 4. Notify the Data Protection Commission (if required)

- **How:** DPC website breach notification process: https://www.dataprotection.ie/  
- **Deadline:** 72 hours from awareness.
- **Include:** nature of the breach; categories and approximate number of people and records; name and contact of the responsible person; likely consequences; measures taken or proposed.

Keep a copy of the submission and any DPC reference number in the register.

If notification is late, explain the delay in the same submission. Do not skip notification because you are late.

---

## 5. Notify affected people (if high risk)

Use clear language. Say what happened, what data, what you have done, what they can do (e.g. be alert to phishing), and how to contact info@theadarecollection.ie. Do not send passwords or the full spreadsheet in that email.

If contacting people would itself cause disproportionate harm (e.g. you only have a phone number that would panic them without context), document why a public notice or DPC-directed method is used instead.

---

## 6. Roles

| Role | Responsibility |
|---|---|
| First detector | Contain, timestamp, escalate |
| Data-protection contact (info@theadarecollection.ie) | Assessment, DPC notification, individual notification, register |
| Directors | Resources, insurer notification, owner/supplier communication if needed |
| IT / website operator | Technical containment, credential rotation, logs |

**Insurer:** If cyber liability insurance is obtained, notify the broker/insurer in parallel with the DPC assessment — policies often have their own short deadlines. **[TO CONFIRM — policy number and 24/7 claims number]**

**Solicitor:** Involve the company’s solicitors before any admission of liability in external wording, where the incident is serious.

---

## 7. After-action (within 2 weeks)

- Close the register row with root cause and what changed (sharing settings, 2FA, training).
- Review whether the Privacy Policy or this procedure needs an update.
- If owners or suppliers received data in error, confirm deletion in writing.

---

## 8. Breach register template

Copy into a restricted Google Sheet or a locked folder. Do not put it on the public website.

| Field | Entry |
|---|---|
| Reference | BR-YYYY-NNN |
| Date/time became aware (UTC and IST) | |
| How discovered | |
| Description | |
| Data categories | |
| Approximate number of people / records | |
| Systems | Sheet / info@ / dylan@ / Cloud Function / other |
| Containment actions and times | |
| Risk rating | Unlikely / Risk / High risk |
| DPC notified? | Yes/No — date, reference |
| Individuals notified? | Yes/No — date, method |
| Insurer notified? | Yes/No |
| Root cause | |
| Remediation | |
| Closed date | |
