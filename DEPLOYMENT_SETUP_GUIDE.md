# Automated Firebase Deployment Setup Guide

This guide will help you set up automated Firebase deployments using GitHub Actions. Follow these steps in order.

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

Create the file `.github/workflows/deploy.yml` with this content:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
        
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
        firebase deploy --only hosting --project theadarecollection-site --token "${{ secrets.FIREBASE_TOKEN }}"
      env:
        FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

## Step 4: Set Up GitHub Repository Secrets

Go to: https://github.com/seanderham1/adarecollectionwebsite/settings/secrets/actions

Add these secrets:

| Secret Name | Secret Value | Description |
|-------------|--------------|-------------|
| `FIREBASE_TOKEN` | [Token from Step 2] | Firebase CI authentication token |
| `VITE_GA_MEASUREMENT_ID` | `G-GF25J69MLQ` | Google Analytics measurement ID |
| `VITE_GOOGLE_MAPS_API_KEY` | `AIzaSyCNQfvlQLy7tm9sB57m2mMsUt9CWln41_s` | Google Maps API key |
| `VITE_GOOGLE_SITE_VERIFICATION` | `JcCXU571lDgwzeNXmi3aPO2_S9zVR-H1NJR64hILP8s` | Google Search Console verification |

## Step 5: Verify Firebase Configuration

Ensure your `firebase.json` is configured correctly:

```json
{
  "functions": { "source": "functions" },
  "hosting": {
    "site": "theadarecollection-site",
    "public": "dist/public",
    "ignore": ["**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "/api/**", "function": "api" },
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
```

## Step 6: Test the Setup

1. Make a small change to your code
2. Commit and push to main branch:
   ```bash
   git add .
   git commit -m "Test automated deployment"
   git push origin main
   ```
3. Check GitHub Actions tab to see deployment progress
4. Verify your site is updated at: https://theadarecollection-site.web.app

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
