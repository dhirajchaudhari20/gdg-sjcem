#!/bin/bash

# Deploy script for GDG Chat Backend
echo "🚀 Starting Deployment to Google Cloud Run..."

# Enable necessary APIs (just in case)
# gcloud services enable run.googleapis.com cloudbuild.googleapis.com

cd backend

# Helper to find gcloud
find_gcloud() {
    # Check PATH first
    if command -v gcloud &> /dev/null; then
        echo "✅ Found gcloud in PATH"
        return 0
    fi

    # Check common install locations
    POSSIBLE_PATHS=(
        "$HOME/google-cloud-sdk/bin"
        "$HOME/Downloads/google-cloud-sdk/bin"
        "/usr/local/bin"
        "/opt/homebrew/bin"
        "/usr/bin"
    )

    for dir in "${POSSIBLE_PATHS[@]}"; do
        if [ -f "$dir/gcloud" ]; then
            echo "✅ Found gcloud in $dir"
            export PATH="$dir:$PATH"
            return 0
        fi
    done

    echo "❌ Could not find 'gcloud' command. Please ensure Google Cloud SDK is installed and in your PATH."
    return 1
}

find_gcloud
if [ $? -ne 0 ]; then
    exit 1
fi

# Authenticate if needed (check if we have active credentials)
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
    echo "⚠️ Not authenticated. Attempting login..."
    gcloud auth login
fi

echo "🚀 Deploying to Google Cloud Run..."
# We are already in 'backend' directory due to line 9

# Deploy using source (Cloud Build)
gcloud run deploy gdg-chat-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --project dc-infotechpvt-1

echo "✅ Deployment Command Finished."
