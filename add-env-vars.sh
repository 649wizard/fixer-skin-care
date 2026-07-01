#!/bin/bash

# Script להוספת environment variables ל-Vercel
# שימוש: bash add-env-vars.sh <path-to-json-file>

if [ -z "$1" ]; then
    echo "❌ אנא הענק את נתיב ל-JSON file"
    echo "שימוש: bash add-env-vars.sh path/to/google-credentials.json"
    exit 1
fi

JSON_FILE="$1"

if [ ! -f "$JSON_FILE" ]; then
    echo "❌ קובץ לא נמצא: $JSON_FILE"
    exit 1
fi

echo "📋 קריאת credentials מ-$JSON_FILE..."

# Extract values from JSON
PROJECT_ID=$(jq -r '.project_id' "$JSON_FILE")
PRIVATE_KEY_ID=$(jq -r '.private_key_id' "$JSON_FILE")
PRIVATE_KEY=$(jq -r '.private_key' "$JSON_FILE")
CLIENT_EMAIL=$(jq -r '.client_email' "$JSON_FILE")
CLIENT_ID=$(jq -r '.client_id' "$JSON_FILE")
CERT_URL=$(jq -r '.client_x509_cert_url' "$JSON_FILE")
SPREADSHEET_ID="1JjsDu0dnQseONleI5ZTvDnuOvJg87BUHVrDxDnyDWpA"

echo "✅ Values extracted:"
echo "  - PROJECT_ID: $PROJECT_ID"
echo "  - CLIENT_EMAIL: $CLIENT_EMAIL"
echo ""

# Add environment variables to Vercel
echo "🔐 Adding environment variables to Vercel..."

vercel env add GOOGLE_PROJECT_ID "$PROJECT_ID" production
vercel env add GOOGLE_PRIVATE_KEY_ID "$PRIVATE_KEY_ID" production
vercel env add GOOGLE_PRIVATE_KEY "$PRIVATE_KEY" production
vercel env add GOOGLE_CLIENT_EMAIL "$CLIENT_EMAIL" production
vercel env add GOOGLE_CLIENT_ID "$CLIENT_ID" production
vercel env add GOOGLE_CERT_URL "$CERT_URL" production
vercel env add GOOGLE_SPREADSHEET_ID "$SPREADSHEET_ID" production

echo ""
echo "✅ Environment variables added!"
echo ""
echo "🚀 עכשיו redeploy את הפרוייקט:"
echo "   vercel deploy --prod"
