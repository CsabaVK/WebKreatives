#!/bin/bash
# WebKreatives — Push to GitHub
# Run this once from inside the webkreatives/ folder

echo "🚀 Setting up WebKreatives GitHub repo..."

# Initialize git if not already done
git init

# Add remote (update this if your URL is different)
git remote remove origin 2>/dev/null
git remote add origin https://github.com/CsabaVK/WebKreatives.git

# Stage all files
git add .

# Commit
git commit -m "Initial WebKreatives website — HTML, CSS, JS, assets"

# Push to main branch
git branch -M main
git push -u origin main

echo "✅ Done! Check https://github.com/CsabaVK/WebKreatives"
