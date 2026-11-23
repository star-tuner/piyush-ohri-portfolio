# Google Cloud & GitHub Deployment Guide — Piyush Ohri Portfolio

This `deployment/` folder contains all scripts, configuration files, and step-by-step instructions to deploy the portfolio to **Google Cloud Run** (using your Google Cloud credits) and connect it to the **`star-tuner/piyush-ohri-portfolio`** GitHub repository for continuous deployment.

---

## 1. Files Included in `deployment/`

| File | Purpose |
| :--- | :--- |
| `deploy-gcp-cloudrun.ps1` | One-command **PowerShell** script (Windows) to enable Google Cloud APIs and deploy directly to Cloud Run in `asia-south1` (Mumbai/Hyderabad latency-optimized). |
| `deploy-gcp-cloudrun.sh` | One-command **Bash** script (Google Cloud Shell / Linux / macOS) to deploy to Cloud Run. |
| `github-setup.ps1` | PowerShell script that initializes Git and creates/pushes to `https://github.com/star-tuner/piyush-ohri-portfolio`. |
| `../Dockerfile` | Production `node:20-alpine` container image serving Brotli & Gzip compressed assets with immutable caching headers on port `8080`. |
| `../cloudbuild.yaml` | Google Cloud Build CI/CD pipeline for automated container builds and Cloud Run deployments on every push to `main`. |

---

## 2. Option A: Fastest Deploy via Google Cloud Shell (Zero Local Install Required)

If you don't have the `gcloud` CLI installed locally on Windows, you can deploy in **60 seconds** directly from your browser using **Google Cloud Shell** (which has `gcloud`, `git`, and your Google Cloud credits pre-authenticated):

1. Open [Google Cloud Console](https://console.cloud.google.com/) and click the **Activate Cloud Shell** icon (`>_`) in the top-right toolbar.
2. Run the following commands in Cloud Shell:

```bash
git clone https://github.com/star-tuner/piyush-ohri-portfolio.git
cd piyush-ohri-portfolio
chmod +x deployment/deploy-gcp-cloudrun.sh
./deployment/deploy-gcp-cloudrun.sh YOUR_GCP_PROJECT_ID asia-south1
```

Cloud Build will package the `Dockerfile` and output your live HTTPS URL (e.g., `https://piyush-ohri-portfolio-xxxxx-el.a.run.app`).

---

## 3. Option B: Automatic Continuous Deployment from GitHub (`star-tuner/piyush-ohri-portfolio`) in Google Cloud Console

You can connect your GitHub repository directly to Google Cloud Run so every commit to `star-tuner/piyush-ohri-portfolio` auto-deploys:

1. Go to **[Google Cloud Run Console](https://console.cloud.google.com/run)** -> Click **Create Service**.
2. Select **Continuously deploy from a repository (source or function)** -> Click **Set up with Cloud Build**.
3. Authenticate GitHub and select:
   - **Repository Provider:** GitHub
   - **Repository:** `star-tuner/piyush-ohri-portfolio`
   - **Branch:** `^main$`
   - **Build Type:** `Dockerfile` (Path: `/Dockerfile`)
4. Configure Service settings:
   - **Service name:** `piyush-ohri-portfolio`
   - **Region:** `asia-south1` (Mumbai — lowest latency for Hyderabad, India)
   - **Authentication:** Select **Allow unauthenticated invocations** (public portfolio)
   - **CPU allocation & scaling:** `0` min instances (scales to zero so it consumes almost $0 of your credits when idle), `5` max instances.
5. Click **Create**.

---

## 4. Option C: Local Windows PowerShell Deployment

If you have the [Google Cloud SDK (`gcloud`)](https://cloud.google.com/sdk/docs/install) installed locally on Windows:

```powershell
# 1. Authenticate with your Google Cloud account
gcloud auth login

# 2. Run the automated deployment script
.\deployment\deploy-gcp-cloudrun.ps1 -ProjectId "YOUR_GCP_PROJECT_ID" -Region "asia-south1"
```

---

## 5. Updating Canonical URL After First Deployment

Once Cloud Run assigns your production URL (or after you attach a custom domain under **Cloud Run -> Manage Custom Domains**), update the domain in:
- `public/index.html` (`<link rel="canonical">` and `og:url`)
- `public/sitemap.xml`
- `public/robots.txt`
