#!/usr/bin/env bash
# Bash Deployment Script for Google Cloud Run (Linux / macOS / Google Cloud Shell)
# Usage: ./deployment/deploy-gcp-cloudrun.sh [GCP_PROJECT_ID] [REGION]

set -euo pipefail

PROJECT_ID="${1:-$(gcloud config get-value project 2>/dev/null || true)}"
REGION="${2:-asia-south1}"
SERVICE_NAME="piyush-ohri-portfolio"

if [[ -z "${PROJECT_ID}" || "${PROJECT_ID}" == "(unset)" ]]; then
  echo "Error: Please pass your GCP Project ID: ./deployment/deploy-gcp-cloudrun.sh <PROJECT_ID>"
  exit 1
fi

echo "=== Deploying ${SERVICE_NAME} to Google Cloud Run (Project: ${PROJECT_ID}, Region: ${REGION}) ==="

gcloud config set project "${PROJECT_ID}"
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com --project "${PROJECT_ID}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${REPO_ROOT}"

gcloud run deploy "${SERVICE_NAME}" \
  --source . \
  --region "${REGION}" \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 256Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 5 \
  --project "${PROJECT_ID}"

SERVICE_URL="$(gcloud run services describe "${SERVICE_NAME}" --region "${REGION}" --project "${PROJECT_ID}" --format='value(status.url)')"
echo ""
echo "=== Deployment Successful! ==="
echo "Live Portfolio URL: ${SERVICE_URL}"
