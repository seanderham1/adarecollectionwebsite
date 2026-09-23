# Automated Firebase Deployment Setup Guide

This guide will help you set up automated Firebase deployments using GitHub Actions. Follow these steps in order.

## Gmail SMTP (`GMAIL_APP_PASSWORD`) — Firebase Secret Manager

Public contact/access emails are sent via Gmail using an **App Password** (never your normal Google password). The password lives in **[Secret Manager](https://console.firebase.google.com/project/theadarecollection-site/functions/secrets)** as `GMAIL_APP_PASSWORD`; it must **not** appear in repo source or GitHub Actions build variables.

### Initial setup or rotation (e.g. after exposure in Git)

1. **Create a new app password**: Google Account → **Security** → **2-Step Verification** → **App passwords** → generate one (revoke obsolete app passwords you no longer need).
2. **Store it in Firebase**:
   ```bash
   firebase functions:secrets:set GMAIL_APP_PASSWORD --project theadarecollection-site
   ```
3. **Redeploy** so the `api` function mounts the secret:
   ```bash
   firebase deploy --only functions:api --project theadarecollection-site
   ```

If `GMAIL_APP_PASSWORD` is missing or wrong, `/api/contact` and `/api/access-request` return a configuration error and mail is not sent.

### If logs show `535 BadCredentials` / “Username and Password not accepted”

The password is reaching Gmail but **SMTP rejects the login**:

1. The **App Password** must be generated while signed into the Google account that **actually logs in** to Gmail (often the same as `info@theadarecollection.ie`; if not, see below).
2. **Google Workspace:** If `info@theadarecollection.ie` is only an **alias** and your real workspace login is e.g. `yourname@theadarecollection.ie`, create the App Password on that **primary** account. Add `functions/.env.theadarecollection-site` (do not commit) with `GMAIL_SMTP_USER=yourname@theadarecollection.ie`. In Gmail for that account, use **Send mail as** → `info@theadarecollection.ie` if you want the From header to stay `info@`. Run `firebase deploy --only functions:api` again after editing the `.env.<project>` file.
3. Confirm **2-Step Verification** is on and that admins allow **App passwords** for your org.

Tail logs:

```bash
firebase functions:log --project theadarecollection-site --only api -n 30
```

### Functions emulator locally

Copy `functions/.env.example` to `functions/.env`, set `GMAIL_APP_PASSWORD=...`, then run the Functions emulator. Do not commit `.env`.

### Historical commits

Any secret that appeared in Git in the past is still reachable via history until rewritten ([`git filter-repo`](https://github.com/newren/git-filter-repo)). Rotating the app password invalidates the leaked credential.

## Google Sheets — contact form log (no service account key)

Many Google Workspace orgs block **service account key** creation (`iam.disableServiceAccountKeyCreation`). This project uses **Application Default Credentials (ADC)** instead: the HTTPS function runs as Google’s **runtime service account**, and you **share the spreadsheet** with that identity (Editor). No JSON key and no Sheets-related Firebase secret are required.

Each successful `/api/contact` still sends email via Gmail and **appends one row** when `CONTACT_SHEET_SPREADSHEET_ID` and `CONTACT_SHEET_RANGE` are set. If Sheets fails after mail succeeds, the user still sees success and the error is logged.

### One-time Google Cloud / Sheets setup

1. Create a spreadsheet with a tab (e.g. `ContactLeads`) and **row 1** headers matching the order in `CONTACT_LEADS_HEADER_ROW` in `functions/src/appendContactToSheet.ts` (15 columns; range example: `ContactLeads!A:O`).
2. In the same GCP project as Firebase (`theadarecollection-site`), enable **Google Sheets API** (APIs & Services → Library).
3. **Find the runtime service account** used by your `api` function (this is who will call the Sheets API):
   - **Google Cloud Console** → **Cloud Functions** → open **`api`** → **Edit** (or **Details**) → **Runtime, build, connections and security** → note **Service account** (often `PROJECT_NUMBER-compute@developer.gserviceaccount.com`, or a project-specific default).
   - Or **Firebase Console** → **Functions** → **`api`** → configuration / “Runtime” section for the service account email.
4. In the Google Sheet: **Share** → add that **runtime service account email** with **Editor** access. You do **not** need a separate “Sheets writer” service account or a downloadable key.

### Firebase function environment variables

In Firebase Console → Functions → **`api`** → Environment variables, set:

- `CONTACT_SHEET_SPREADSHEET_ID` — from the Sheet URL `…/d/{ID}/edit`
- `CONTACT_SHEET_RANGE` — e.g. `ContactLeads!A:O` (tab name + column span must match your sheet)

Redeploy after changing env:

```bash
firebase deploy --only functions:api --project theadarecollection-site
```

Until both env vars are set, the function **skips** the Sheets append (info log only); email behaviour is unchanged.

### Optional: local emulator with a key

If your org allows keys in a **non-production** account, you can set `GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON` in `functions/.env` for the emulator only. Otherwise use `gcloud auth application-default login` and share the sheet with your **user** Google account for local testing.

## Prerequisites
- Firebase project: `theadarecollection-site`
- GitHub repository: `seanderham1/adarecollectionwebsite`
- Node.js project with build process

## Step 1: Re-authenticate with Firebase

**First, always re-authenticate with Firebase to ensure you have valid credentials:**

```bash
firebase login --reauth
```

This will open a browser window for authentication. Make sure you're logged in as `info@theadarecollection.ie`.

## Step 2: Generate Firebase CI Token

Generate a token for automated deployments:

```bash
firebase login:ci
```

**Save the token that's generated** - you'll need it for GitHub secrets.

## Step 3: Create GitHub Actions Workflow

Create the file `.github/workflows/deploy.yml` with this content (or keep the copy already in-repo). **`workflow_dispatch`** lets you click “Run workflow” on `main` in the Actions tab without a push. Production deploy does **not** run on pull requests—only merges/pushes to `main`.

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build
        env:
          VITE_GA_MEASUREMENT_ID: ${{ secrets.VITE_GA_MEASUREMENT_ID }}
          VITE_GOOGLE_MAPS_API_KEY: ${{ secrets.VITE_GOOGLE_MAPS_API_KEY }}
          VITE_GOOGLE_SITE_VERIFICATION: ${{ secrets.VITE_GOOGLE_SITE_VERIFICATION }}

      - name: Deploy to Firebase
        run: |
          npm install -g firebase-tools
          firebase deploy --only hosting --project theadarecollection-site --non-interactive --token "${{ secrets.FIREBASE_TOKEN }}"
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

## Step 4: Set Up GitHub Repository Secrets

Go to: https://github.com/seanderham1/adarecollectionwebsite/settings/secrets/actions

Add these secrets **in GitHub only**—never paste real values into this repo, issues, or chat logs:

| Secret Name | Secret value (example / where to get it) | Description |
|-------------|--------------------------------------------|-------------|
| `FIREBASE_TOKEN` | Output of `firebase login:ci` (Step 2) | Firebase CLI authentication for CI |
| `VITE_GA_MEASUREMENT_ID` | e.g. `G-XXXXXXXX` from GA4 admin | Google Analytics measurement ID |
| `VITE_GOOGLE_MAPS_API_KEY` | Maps key from Google Cloud (HTTP referrers restricted) | Bundled at build time into the client |
| `VITE_GOOGLE_SITE_VERIFICATION` | Meta verification string from Search Console | Injected into the site for ownership proof |

**Committing `firebase.json`:** Safe. It only describes Hosting (public dir, rewrites, headers). It does **not** contain `FIREBASE_TOKEN`, Gmail app passwords, or Maps/GA/Site Verification strings. Run `npm run build` locally before commit when rewrites change so `firebase.json` stays in sync with prerender routes.

## Step 5: Verify Firebase Configuration

Ensure your `firebase.json` is configured correctly. Use `hosting.ignore` for dotfiles (`**/.*`), `node_modules`, and any bulky local folders (for example **`**/hillview-videos/**`**) so they are never uploaded—even if present on disk:

Use the **`firebase.json` in this repository** as the source of truth (Hosting **rewrites** include `/api/**`, prerendered paths → `/_prerender/*.html`, then `**` → `/index.html`). The snippet below is **illustrative only**—do not paste an outdated copy from this guide into your project.

```json
{
  "functions": { "source": "functions" },
  "hosting": {
    "site": "theadarecollection-site",
    "public": "dist/public",
    "ignore": ["**/.*", "**/node_modules/**", "**/hillview-videos/**"],
    "rewrites": [ "…see repo…", { "source": "**", "destination": "/index.html" } ]
  }
}
```

Add entries under `ignore` for any other large local-only directories (see `firebase.json` in this repo).

## Step 6: Test the Setup

Automated deploy **only runs after code lands on GitHub** (local `firebase deploy` does not trigger Actions). Confirm **GitHub Actions** is allowed for the repo: **Settings → Actions → General**.

1. Configure all secrets in Step 4 (missing `FIREBASE_TOKEN` or `VITE_*` values produces **failed** runs, not skipped runs).
2. Either **push** to `main`:
   ```bash
   git add .
   git commit -m "Test automated deployment"
   git push origin main
   ```
   or open **Actions → Deploy to Firebase → Run workflow** (because `workflow_dispatch` is enabled).
3. Confirm the workflow run succeeds in the **Actions** tab.
4. Verify your site at: https://theadarecollection-site.web.app (and custom domain DNS in Firebase Hosting if configured).

## Step 7: Create Token Management Script

Create `scripts/update-firebase-token.sh`:

```bash
#!/bin/bash

echo "🔄 Generating new Firebase CI token..."
echo "This will open a browser window for authentication."

NEW_TOKEN=$(firebase login:ci)

if [ $? -eq 0 ]; then
    echo "✅ New token generated successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to: https://github.com/seanderham1/adarecollectionwebsite/settings/secrets/actions"
    echo "2. Find 'FIREBASE_TOKEN' and click 'Update'"
    echo "3. Paste this new token:"
    echo "" 
    echo "$NEW_TOKEN"
    echo ""
    echo "4. Click 'Update secret'"
    echo ""
    echo "🎯 Your automated deployments will continue working!"
else
    echo "❌ Failed to generate new token. Please try again."
    exit 1
fi
```

Make it executable:
```bash
chmod +x scripts/update-firebase-token.sh
```

## How It Works

1. **Automatic Trigger**: Every push to main branch triggers deployment
2. **Build Process**: Installs dependencies and builds project with environment variables
3. **Deployment**: Uses Firebase CLI with token authentication to deploy
4. **Live Site**: Updates https://theadarecollection-site.web.app automatically

## Troubleshooting

### Firebase Authentication Errors
- Run `firebase login --reauth` to refresh credentials
- Generate new CI token with `firebase login:ci`
- Update `FIREBASE_TOKEN` secret in GitHub

### Build Failures
- Check that all environment variables are set in GitHub secrets
- Verify Node.js version compatibility (using version 20)
- Check build logs in GitHub Actions

### Deployment Failures
- Ensure Firebase project ID is correct: `theadarecollection-site`
- Verify `firebase.json` configuration
- Check Firebase hosting settings

## Maintenance

### When Firebase Token Expires (Every few months)
1. Run: `./scripts/update-firebase-token.sh`
2. Update GitHub secret with new token
3. Deployments continue working

### Regular Updates
- Keep Firebase CLI updated
- Monitor GitHub Actions for any issues
- Check Firebase console for hosting status

## Success Indicators

✅ **Setup Complete When:**
- GitHub Actions workflow runs successfully
- Site deploys to https://theadarecollection-site.web.app
- No authentication errors in deployment logs
- Environment variables are properly loaded during build

---

**Note**: This setup provides fully automated deployments. Just push code to main branch and your site updates automatically!
