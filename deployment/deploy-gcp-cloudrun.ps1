# PowerShell Deployment Script for Google Cloud Run
# Usage: .\deployment\deploy-gcp-cloudrun.ps1 -ProjectId "your-gcp-project-id" -Region "asia-south1"

param(
    [Parameter(Mandatory=$false)]
    [string]$ProjectId = "",

    [Parameter(Mandatory=$false)]
    [string]$ServiceName = "piyush-ohri-portfolio",

    [Parameter(Mandatory=$false)]
    [string]$Region = "asia-south1"
)

$ErrorActionPreference = "Stop"

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host " Deploying Piyush Ohri Portfolio to Google Cloud Run  " -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan

if (-not (Get-Command gcloud -ErrorAction SilentlyContinue)) {
    Write-Error "Google Cloud SDK (gcloud) is not installed or not in PATH. Install from https://cloud.google.com/sdk/docs/install"
    exit 1
}

if ([string]::IsNullOrWhiteSpace($ProjectId)) {
    $ProjectId = (gcloud config get-value project 2>$null).Trim()
}

if ([string]::IsNullOrWhiteSpace($ProjectId) -or $ProjectId -eq "(unset)") {
    Write-Host "No active GCP Project found. Listing available projects..." -ForegroundColor Yellow
    gcloud projects list
    $ProjectId = Read-Host "Enter your Google Cloud Project ID"
}

Write-Host "-> Setting active GCP Project to: $ProjectId" -ForegroundColor Green
gcloud config set project $ProjectId

Write-Host "-> Enabling required Google Cloud APIs (Cloud Run, Cloud Build, Artifact Registry)..." -ForegroundColor Green
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com --project $ProjectId

$RepoRoot = Split-Path -Parent $PSScriptRoot
Push-Location $RepoRoot

try {
    Write-Host "-> Deploying source to Google Cloud Run ($Region)..." -ForegroundColor Green
    gcloud run deploy $ServiceName `
        --source . `
        --region $Region `
        --platform managed `
        --allow-unauthenticated `
        --port 8080 `
        --memory 256Mi `
        --cpu 1 `
        --min-instances 0 `
        --max-instances 5 `
        --project $ProjectId `
        --quiet

    $ServiceUrl = (gcloud run services describe $ServiceName --region $Region --project $ProjectId --format="value(status.url)")
    Write-Host ""
    Write-Host "======================================================" -ForegroundColor Green
    Write-Host " Deployment Complete!" -ForegroundColor Green
    Write-Host " Live URL: $ServiceUrl" -ForegroundColor Cyan
    Write-Host "======================================================" -ForegroundColor Green
} finally {
    Pop-Location
}
