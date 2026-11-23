# GitHub Repository Creation & Push Script (star-tuner organization)
# Creates star-tuner/piyush-ohri-portfolio and pushes main branch

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $PSScriptRoot
Push-Location $RepoRoot

try {
    if (-not (Test-Path ".git")) {
        git init
        git branch -M main
    }
    git add -A
    git commit -m "feat: initial commit of Piyush Ohri SEO portfolio with 4 live projects, research & GCP deployment"
    gh repo create star-tuner/piyush-ohri-portfolio --public --source=. --remote=origin --push
} finally {
    Pop-Location
}
