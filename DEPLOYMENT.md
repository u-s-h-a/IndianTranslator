# 🚀 Deployment Guide: GitHub to Vercel

## Step 1: Upload to GitHub

### 1. Create a GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it: `indian-translator-app`
4. Make it **Public**
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 2. Upload Your Code to GitHub

Open Command Prompt/Terminal in your project folder and run:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Indian Multi-Language Translator"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/indian-translator-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

## Step 2: Deploy on Vercel

### 1. Connect to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your GitHub repository: `indian-translator-app`

### 2. Configure Vercel
1. **Framework Preset**: Select "Other"
2. **Root Directory**: Leave as `./` (root)
3. **Build Command**: `cd client && npm install && npm run build`
4. **Output Directory**: `client/build`
5. **Install Command**: Leave empty

### 3. Environment Variables (Optional)
Add these if needed:
- `NODE_ENV`: `production`

### 4. Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Your app will be live at: `https://your-app-name.vercel.app`

## Step 3: Update API URL

After deployment, update the API URL in your React app:

1. Go to your deployed Vercel URL
2. Copy the URL (e.g., `https://indian-translator-app.vercel.app`)
3. Update `client/src/App.js`:

```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-actual-vercel-url.vercel.app/api' 
  : 'http://localhost:5000';
```

4. Commit and push the changes:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

## Step 4: Test Your Deployed App

1. Visit your Vercel URL
2. Test translation between different languages
3. Test regional language features
4. Test all features (auto-translate, history, etc.)

## Troubleshooting

### If API calls fail:
- Check that your Vercel URL is correct in `App.js`
- Ensure the backend is properly deployed
- Check Vercel logs for any errors

### If build fails:
- Check that all dependencies are in `package.json`
- Ensure `requirements.txt` is in the server folder
- Check that `vercel.json` is in the root directory

## Your App is Now Live! 🎉

Your Indian Multi-Language Translator is now deployed and accessible to users worldwide!

**Features Available:**
- ✅ 20+ Indian languages
- ✅ Regional dialects (Marwadi, Haryanvi, Bhojpuri)
- ✅ Auto-translate
- ✅ Text-to-speech
- ✅ Translation history
- ✅ Dark theme
- ✅ Responsive design 