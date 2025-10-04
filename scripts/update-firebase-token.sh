#!/bin/bash

# Script to update Firebase token for GitHub Actions
# Run this when your Firebase token expires

echo "🔄 Generating new Firebase CI token..."
echo "This will open a browser window for authentication."

# Generate new token
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
