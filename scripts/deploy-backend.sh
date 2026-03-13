#!/bin/bash

# LocalDeals Backend Deployment to Cloud Run
# This script builds and deploys the backend to Google Cloud Run

set -e  # Exit on error

PROJECT_ID="localdeals-4f0bf"
SERVICE_NAME="localdeals-api"
REGION="us-central1"
MEMORY="512Mi"
TIMEOUT="300"

echo "🚀 Deploying LocalDeals Backend to Cloud Run"
echo "Project: $PROJECT_ID"
echo "Service: $SERVICE_NAME"
echo "Region: $REGION"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI not found. Please install it: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Set project
echo "Setting GCP project..."
gcloud config set project $PROJECT_ID

# Build and push Docker image
echo "Building Docker image..."
gcloud run deploy $SERVICE_NAME \
    --source . \
    --platform managed \
    --region $REGION \
    --memory $MEMORY \
    --timeout $TIMEOUT \
    --allow-unauthenticated \
    --set-env-vars="NODE_ENV=production,PORT=8080" \
    --source-dir=backend

echo "✅ Deployment complete!"
echo "Service URL: https://$SERVICE_NAME-xxxxx.run.app"
echo ""
echo "Next steps:"
echo "1. Update environment variables in Cloud Run console"
echo "2. Set FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, etc."
echo "3. Test the API: curl https://[SERVICE-URL]/api/v1/health"
