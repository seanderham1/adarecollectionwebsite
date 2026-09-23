# Data Protection Audit — The Adare Collection Limited

**Document status:** Internal — for legal advisers. Not for publication.  
**Controller:** The Adare Collection Limited (CRO 812874), trading as The Adare Collection  
**Website:** https://theadarecollection.com  
**Date of this document:** 9 September 2026  
**Privacy Policy version described:** 2026-09-09  
**Scope:** Personal data processed via the public website, the enquiry Cloud Function, Google Sheets lead register, and related Gmail mailboxes (info@ and dylan@). Booking/payment processing that happens off-website is described only at a high level.

This document describes the **remediated** state of the website as of 9 September 2026, following an internal technical audit. A dated remediation log is in Section 11.

---

## 1. Controller identity and contacts

| Item | Value |
|---|---|
| Legal name | The Adare Collection Limited |
| Trading name | The Adare Collection |
| CRO | 812874 |
| Registered office | Byrne and Co., Gortboy, Church Street, Newcastle West, Co. Limerick, Ireland, V42 F982 |
| Primary contact for data-subject requests | info@theadarecollection.ie |
| Operational follow-up mailbox | dylan@theadarecollection.ie |
| Phone | +353 86 668 1930 |
| Supervisory authority | Data Protection Commission (Ireland) |
| Formal DPO | Not appointed. At this size a statutory DPO is not expected to be required. Data-protection contact is the info@theadarecollection.ie mailbox (confirmed 9 September 2026). |

Email is the primary route for data-protection requests. The registered office is an accountant’s address, not an operational site.

### Open legal item — PSRA

The company describes itself as exclusive representative, marketing agent, and booking facilitator, and collects deposits into a designated client account. The business works alongside a rental agency whose solicitor holds a PSRA licence. Whether The Adare Collection Limited must hold its own PSRA licence, or whether disclosure of the agency relationship is sufficient, is a legal question. **This is not a technical finding; it is flagged for solicitor advice.** There is currently no PSRA licence number on the website.

---

## 2. Nature of the business (processing context)

The website markets a limited portfolio of private luxury residences near Adare Manor for tournament week 2027. There is no online booking engine and no payment collection on the site. The only first-party collection of personal data on the site is a single enquiry form.

---

## 3. Field-by-field data inventory (website enquiry)

Source: `client/src/components/contact-enquiry-form.tsx`, stored by `functions/src/appendContactToSheet.ts`.

| Field | Required | Special-category risk | Stored in Sheet | Copied to email |
|---|---|---|---|---|
| Submitted timestamp (UTC) | System | No | Yes | Yes |
| Full name | Yes | No | Yes | Yes |
| Email | Yes | No | Yes | Yes (plus auto-reply to the enquirer) |
| International dialling code | Yes | Indirect (country) | Yes | Yes |
| Phone (national and combined) | Yes | No | Yes | Yes |
| Enquiry type (private / corporate / agency) | Yes | No | Yes | Yes |
| Organisation / company | If corporate or agency | No | Yes | Yes |
| Role / position | If corporate or agency | No | Yes | Yes |
| Estimated guests (1–16) | Yes | No | Yes | Yes |
| Intended use | Yes | No | Yes | Yes |
| Previous major-event accommodation | No | No | Yes | Yes |
| Budget band | Yes (defaulted slider) | Financial (not special category) | Yes | Yes |
| Preferred properties | Yes (≥1) | No | Yes | Yes |
| Additional notes (free text) | No | Possible incidental special-category data if the enquirer volunteers it | Yes | Yes |
| Privacy consent | Yes | No | Yes (“Yes”) | Yes |
| Consent timestamp (UTC) | System | No | Yes | Same as submitted time |
| Privacy policy version | System | No | Yes | Yes |

**Not collected on the website:** postal address, payment-card data, dates of birth, passport/ID, newsletter subscription, account passwords.

**Browser storage (first party):** `adare_cookie_consent` in `localStorage` (`{v, analytics, advertising, decidedAt}`). No name or email.

---

## 4. Data flow

```
Visitor
  → HTTPS website (Firebase Hosting, EU CDN)
  → POST /api/contact (Cloud Function `api`, region europe-west1, Belgium)
       → Email to info@theadarecollection.ie (Google Workspace / Gmail SMTP)
       → Auto-reply to the enquirer
       → Append row to Google Sheet ContactLeads (columns A:R)
  → Named staff read the sheet and/or inbox and follow up from info@ and dylan@
  → If a booking proceeds: data is shared with the relevant property owner and,
    where the guest requests them, guest-service suppliers
```

There is no application database, no Firestore, no CRM, and no admin UI. The Drizzle/Postgres schema that previously existed in the repository was unused and has been removed.

Durable copies of an enquiry:

1. Google Sheet lead register (spreadsheet ID `1gs-h5GrPpQqbHDf-UAiiHh0Et9y19xFhByG2ce92pq4`, tab `ContactLeads`)
2. `info@theadarecollection.ie` inbox (notification email)
3. Enquirer’s own inbox (auto-reply; does not contain the full form payload)
4. `dylan@theadarecollection.ie` when staff forward or reply from that mailbox

Google Cloud Logging records request path and method only. Enquirer email addresses are **not** written to logs.

---

## 5. Record of Processing Activities (GDPR Article 30)

### A. Website enquiries

| | |
|---|---|
| Purpose | Assess and respond to property enquiries |
| Categories of data subjects | Prospective guests, corporate bookers, agencies |
| Categories of personal data | As in Section 3 |
| Recipients | Internal staff (info@, dylan@); Google (processor: Functions, Workspace, Sheets); property owners and guest-service suppliers if a booking / service request proceeds |
| Transfers | Enquiry ingest in EU (Belgium). Workspace/Sheets under Google DPA. Optional Google Ads may involve US processing if the visitor consents. Google Maps on map pages may involve US processing |
| Retention | 24 months from submission (sheet rows deleted monthly by scheduled function). Mailbox copies: same period, manual (see DSAR/retention procedure) |
| Security | TLS; Secret Manager for SMTP password; named-individual sheet access; CORS allow-list; rate limiting; EU function region |

**Lawful basis:** Consent for the form submission (Art. 6(1)(a)); pre-contractual steps to respond (Art. 6(1)(b)). Follow-up email from info@ / dylan@ is the performance of those steps.

### B. Website hosting and security logs

| | |
|---|---|
| Purpose | Deliver the site; diagnose faults; detect abuse |
| Data | IP address, URL, user agent, timestamp (infrastructure logs) |
| Recipients | Google (Firebase Hosting / Cloud Logging) |
| Retention | Google Cloud Logging default for `_Default` (typically 30 days unless changed) |
| Lawful basis | Legitimate interests (Art. 6(1)(f)) — operating and securing the website |

### C. Analytics (optional)

| | |
|---|---|
| Purpose | Understand aggregated site usage |
| Data | Online identifiers, pages viewed, approximate location, device/browser |
| Recipients | Google Analytics / Google LLC |
| Lawful basis | Consent (ePrivacy + Art. 6(1)(a)) |
| Cookies | `_ga`, `_ga_*`, `_gid` — only after opt-in |

### D. Advertising / conversion measurement (optional)

| | |
|---|---|
| Purpose | Measure Google Ads conversions; remarketing if enabled in the GTM container |
| Recipients | Google Ads |
| Lawful basis | Consent (ePrivacy + Art. 6(1)(a)) |
| Cookies | `_gcl_au`, `_gcl_aw`, `_gac*` — only after opt-in |
| Control | Google Consent Mode v2 defaults to denied; GTM container `GTM-WK9PD9T3` must have tags configured to honour Consent Mode (**operator action — Appendix A**) |

### E. Interactive map and 3D tours

| | |
|---|---|
| Purpose | Show property location on home and property pages; 3D tour at the visitor’s request |
| Recipients | Google Maps (on pages that include a map); Matterport (after opening a tour) |
| Lawful basis | Legitimate interests in showing property locations; Matterport IP transfer is a consequence of opening a tour. Disclosed in the Privacy Policy |

### F. Bookings and client-account payments (off-website)

| | |
|---|---|
| Purpose | Perform Residential Letting Agreements; collect Deposit, Rent, Security Deposit |
| Data | Identity, stay details, payment references (not collected by the website form) |
| Recipients | Property owners; banks; guest-service suppliers as requested |
| Retention | 7 years after the stay (legal/accounting) |
| Lawful basis | Contract (Art. 6(1)(b)); legal obligation for accounting records (Art. 6(1)(c)) |

---

## 6. Processor and sub-processor register

| Provider | Role | Location / notes | Transfer mechanism |
|---|---|---|---|
| Google Ireland Limited / Google LLC — Firebase Hosting | Website hosting | Global CDN; project `theadarecollection-site` | Google Cloud/Firebase terms + DPA |
| Google — Cloud Functions | Receives `POST /api/contact` | **europe-west1 (Belgium)** after this remediation | Intra-EU processing |
| Google Workspace (Gmail) | Notification email, auto-reply, staff follow-up | Paid Workspace (**confirmed**) | Google Workspace DPA; EU-US DPF / SCCs for any US access |
| Google Sheets | Lead register `ContactLeads` | Same Workspace | Same |
| Google Tag Manager | Tag delivery (`GTM-WK9PD9T3`) | Loads on every page; Consent Mode defaults deny storage | Consent for optional tags |
| Google Analytics 4 | Usage measurement | Only if analytics consented | Consent |
| Google Ads | Conversion / remarketing | Only if advertising consented | Consent |
| Google Maps JavaScript API | Interactive maps | Loads on home and property pages | Disclosed; IP to Google on map-page view |
| Matterport, Inc. | 3D tours | Loaded only after click | Disclosed in Privacy Policy |

Gmail App Password is held in Google Secret Manager (`GMAIL_APP_PASSWORD`). Sheet ID and range are Cloud Functions environment config, not committed to git (except `.env.example` with empty values).

---

## 7. Technical and organisational measures (Article 32)

| Measure | Implementation |
|---|---|
| Encryption in transit | HTTPS / TLS for the website and API |
| Secrets | SMTP app password in Secret Manager; not in source control |
| Region | Enquiry function in `europe-west1` |
| Access control | Sheet shared with named individuals only (**operator: reconfirm sharing list; no “anyone with the link”**) |
| Authentication | Google Workspace accounts; **operator: enforce 2FA** on every account with access to info@, dylan@, or the sheet |
| Abuse protection | CORS restricted to first-party origins (plus localhost and Firebase preview pattern); 8 POSTs / 15 minutes / IP on `/api/contact` |
| Consent evidence | Sheet columns: Privacy consent, Consent timestamp, Privacy policy version |
| Retention | Monthly scheduled function deletes sheet rows older than 24 months |
| Code hygiene | Removed live `/api/access-request` (no consent, hardcoded password `access345`), debug catch-all that listed routes, newsletter endpoint that logged emails, unused schema with a plaintext password column |
| Fonts | Self-hosted Inter and Playfair Display; no Google Fonts request on page load |

### Residual operator actions (cannot be completed in code)

1. **Rotate the Google Maps API key** previously present in git history (`AIzaSyCNQfvlQLy7tm9sB57m2mMsUt9CWln41_s`, commits `83cb86f`–`46138ad`). Confirm HTTP-referrer restrictions to `theadarecollection.com` and `www.theadarecollection.com`. This is a billing/quota risk, not a personal-data dump.
2. **Configure Consent Mode in the GTM console** (Appendix A). Code sends the signals; tags must honour them.
3. **Confirm Google Ads audience / data retention** and whether remarketing lists contain identifiers collected before Consent Mode.
4. **Confirm sheet sharing** is named individuals only; remove former staff.
5. **Enforce Workspace 2FA.**
6. **After deploying the EU function, delete the old `api` function in `us-central1`.** Firebase cannot move a function between regions in place. Deploy creates `europe-west1`; the Iowa function remains until deleted.
7. **Add header cells P–R** on the existing `ContactLeads` tab (`Privacy consent`, `Consent timestamp (UTC)`, `Privacy policy version`) so new appends line up. Existing rows will have empty consent columns.
8. **Obtain cyber liability insurance** if not already in place (breach procedure assumes it may be added later).

---

## 8. Retention schedule

| Record | Period | How enforced |
|---|---|---|
| Enquiry sheet row | 24 months from submission | Scheduled Cloud Function `purgeExpiredContactLeadsJob` (04:00 Europe/Dublin on the 1st of each month) |
| Enquiry emails in info@ / dylan@ | 24 months from last enquiry correspondence | Manual — see `dsar-procedure.md` |
| Cookie choice in the browser | Until cleared or schema version bump | Client `localStorage` |
| Analytics | ≤ 14 months | Google Analytics admin setting (**operator confirm**) |
| Confirmed booking / payment records | 7 years after stay | Off-website accounting process |
| Cloud Logging | Default (~30 days) unless changed | Google Cloud |

---

## 9. Data-subject rights

Requests go to info@theadarecollection.ie. Statutory response: 30 days (GDPR Art. 12(3)).

Operational runbook: [dsar-procedure.md](./dsar-procedure.md).

There is no self-service portal. Fulfilment is a search of the Sheet (email column) and the two mailboxes.

---

## 10. Cookie and tracking register

| Name / system | Category | Default | Notes |
|---|---|---|---|
| `adare_cookie_consent` | Essential | Set when the visitor chooses | Schema version 2 (analytics + advertising). Incrementing version re-prompts. |
| Google Consent Mode v2 | Signal | Denied for `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` | Inline script in `client/index.html` before GTM; restored from localStorage for returning visitors |
| GTM `GTM-WK9PD9T3` | Container | Loads on every page | Must not fire Ads/Analytics tags until consent granted |
| `_ga`, `_gid` | Analytics | Off | Injected only if analytics allowed |
| `_gcl_*` | Advertising | Off | Google Ads |
| Google Maps cookies | Functional / Google | Set when a map page loads | Home and property maps |
| Matterport | Third party | Off until click | Tour modal |

Banner UI: Reject optional, Manage preferences, Accept all — reject is equally prominent. Preferences include separate Analytics and Advertising toggles.

---

## 11. Remediation log (Article 24 accountability)

Audit completed 9 September 2026. Findings below were remediated in the same change set unless marked as operator action.

| ID | Finding | Severity | Remediation | Date |
|---|---|---|---|---|
| F1 | Google Tag Manager (including Google Ads) loaded with no Consent Mode defaults; cookie banner only gated a separate GA4 component | High | Consent Mode v2 defaults denied; advertising category added; schema version 2 re-prompts all visitors; `gtag('consent','update')` on choice | 2026-09-09 |
| F2 | Enquiry Cloud Function ran in `us-central1` (USA) | High | Function and Hosting rewrite moved to `europe-west1`. **Operator: delete old US function after deploy** | 2026-09-09 |
| F3 | Privacy Policy promised retention periods with no deletion | High | 24-month enquiry period; monthly purge job; policy rewritten to match | 2026-09-09 |
| F4 | Privacy Policy did not name Google or Matterport; did not disclose the Sheets lead register | High | Policy Section 5 rewritten | 2026-09-09 |
| F5 | Policy described newsletters, postal addresses, implied consent, and personalisation the site does not do | High | Policy rewritten; implied-consent sentence removed; Terms §7 no longer claims browse-wrap consent | 2026-09-09 |
| F6 | Live `/api/access-request` with no consent checkbox; hardcoded password `access345` in client JS and email | Medium | Endpoint, forms, and password removed | 2026-09-09 |
| F7 | Consent recorded in email but not on the Sheet | Medium | Columns P–R added in code. **Operator: add header row cells on the live sheet** | 2026-09-09 |
| F8 | Enquirer email written to Cloud Logging | Medium | Log line reduced to “Contact form submitted” | 2026-09-09 |
| F9 | Open CORS; no rate limit on `/api/contact` | Medium | Origin allow-list; 8 requests / 15 minutes / IP | 2026-09-09 |
| F10 | Google Fonts and Maps loaded on page view (IP to Google) | Medium | Fonts self-hosted. Maps click-to-load was added then removed the same day for UX; maps load on map pages. Disclosed in Privacy Policy | 2026-09-09 |
| F11 | Maps API key in git history | Medium | **Operator: rotate key and restrict referrers** | Open |
| F12 | Debug catch-all enumerated API routes | Low | Removed | 2026-09-09 |
| F13 | Dead newsletter endpoint logged emails; unused DB schema with plaintext password | Low | Removed | 2026-09-09 |
| F14 | `.firebaserc` maps staging to the production Firebase project | Low | Unchanged — still a process risk. Staging deploys write to the live sheet if the function env is production | Open (process) |
| F15 | No written breach procedure or DSAR runbook | Medium | This pack: `breach-response-procedure.md`, `dsar-procedure.md` | 2026-09-09 |

---

## Appendix A — GTM Consent Mode (operator steps)

Code change alone does not stop Ads tags. In [Google Tag Manager](https://tagmanager.google.com/) for container `GTM-WK9PD9T3`:

1. Enable **Consent Overview** (Admin → Container Settings → Enable consent overview).
2. For each Google Ads / Floodlight / remarketing tag, set required consent to **ad_storage** (and **ad_user_data** / **ad_personalization** where the tag UI offers them).
3. For each Google Analytics tag, set required consent to **analytics_storage**.
4. Do **not** use “Google tag: Consent Initialization” in a way that grants storage before the page’s default denied command. The site already sends `consent default` denied in `index.html`.
5. Publish the container.
6. Verify with Tag Assistant: a visit with “Reject optional” must not set `_ga` / `_gcl` cookies; “Accept all” may set them.

---

## Appendix B — Related procedures

- [Breach response procedure](./breach-response-procedure.md)
- [Data subject access / erasure runbook](./dsar-procedure.md)
