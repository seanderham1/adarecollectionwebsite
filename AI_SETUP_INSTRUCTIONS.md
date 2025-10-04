# AI Assistant Setup Instructions

## Quick Setup for AI Assistants

When helping with this project, follow this exact setup process:

### 1. ALWAYS Start with Firebase Re-authentication
```bash
firebase login --reauth
```

### 2. Project Details
- **Firebase Project**: `theadarecollection-site`
- **GitHub Repo**: `seanderham1/adarecollectionwebsite`
- **Live Site**: https://theadarecollection-site.web.app
- **Account**: `info@theadarecollection.ie`

### 3. Current Environment Variables
```bash
VITE_GA_MEASUREMENT_ID=G-GF25J69MLQ
VITE_GOOGLE_MAPS_API_KEY=AIzaSyCNQfvlQLy7tm9sB57m2mMsUt9CWln41_s
VITE_GOOGLE_SITE_VERIFICATION=JcCXU571lDgwzeNXmi3aPO2_S9zVR-H1NJR64hILP8s
```

### 4. Deployment Method
- **Automated**: GitHub Actions on push to main
- **Manual**: `firebase deploy --only hosting`
- **Token**: Use `firebase login:ci` for CI/CD

### 5. Key Files
- **Workflow**: `.github/workflows/deploy.yml`
- **Config**: `firebase.json` (public: "dist/public")
- **Build**: `npm run build` → `dist/public/`

### 6. Common Issues & Solutions

**Authentication Error**: 
- Run `firebase login --reauth`
- Generate new token: `firebase login:ci`
- Update GitHub secret `FIREBASE_TOKEN`

**Build Failures**:
- Check environment variables in GitHub secrets
- Verify Node.js version 20 in workflow
- Ensure all API keys are valid

**Deployment Failures**:
- Verify Firebase project ID: `theadarecollection-site`
- Check `firebase.json` configuration
- Ensure hosting site is active

### 7. Quick Commands
```bash
# Re-authenticate
firebase login --reauth

# Generate CI token
firebase login:ci

# Manual deploy
firebase deploy --only hosting

# Check status
firebase hosting:sites:list
```

### 8. GitHub Secrets Required
- `FIREBASE_TOKEN` - Firebase CI authentication
- `VITE_GA_MEASUREMENT_ID` - Google Analytics
- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps
- `VITE_GOOGLE_SITE_VERIFICATION` - Google Search Console

---

**Remember**: Always start with Firebase re-authentication when helping with deployments!
