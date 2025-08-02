# 🌐 Indian Multi-Language Translator

A modern, feature-rich translator app supporting 20+ Indian languages including regional dialects like Marwadi, Haryanvi, and Bhojpuri.

## ✨ Features

- 🌐 **Multi-Language Support**: 20+ Indian languages + international languages
- 🇮🇳 **Regional Language Support**: Marwadi, Haryanvi, Bhojpuri with unique dialect modifications
- 📝 **Auto-Translate**: Real-time translation as you type
- 🔊 **Text-to-Speech**: Speak text in different languages
- 📚 **Translation History**: Save and reload previous translations
- 📊 **Real-time Statistics**: Character and word count
- ⌨️ **Keyboard Shortcuts**: Ctrl+Enter, Ctrl+C, Ctrl+S, Ctrl+H
- 📋 **One-click Copy**: Copy translations instantly
- 🔄 **Language Swap**: Quick language switching
- 🌙 **Dark Theme**: Beautiful dark UI design
- 📱 **Responsive Design**: Works on all devices

## 🚀 Deployment Options

### Option 1: Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Update API URL:**
   - Replace `https://your-app-name.vercel.app/api` in `client/src/App.js` with your actual Vercel URL

### Option 2: Deploy to Netlify

1. **Build the React app:**
   ```bash
   cd client
   npm install
   npm run build
   ```

2. **Deploy backend to Railway/Heroku:**
   - Upload `server/` folder to Railway or Heroku
   - Update API URL in React app

3. **Deploy frontend to Netlify:**
   - Upload `client/build/` folder to Netlify

### Option 3: Deploy to Railway

1. **Create Railway account**
2. **Connect your GitHub repository**
3. **Railway will auto-detect and deploy both frontend and backend**

## 🛠️ Local Development

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.7 or higher)
- npm or yarn

### Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Translator
   ```

2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../server
   pip install -r requirements.txt
   ```

4. **Start the backend server:**
   ```bash
   python app.py
   ```

5. **Start the frontend development server:**
   ```bash
   cd ../client
   npm start
   ```

6. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📁 Project Structure

```
Translator/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   └── App.css        # Styles
│   └── package.json
├── server/                 # Flask backend
│   ├── app.py             # Main Flask app
│   └── requirements.txt   # Python dependencies
├── vercel.json            # Vercel configuration
└── README.md
```

## 🌐 Supported Languages

### Indian Languages
- Hindi (हिंदी)
- Bengali (বাংলা)
- Telugu (తెలుగు)
- Tamil (தமிழ்)
- Marathi (मराठी)
- Gujarati (ગુજરાતી)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Punjabi (ਪੰਜਾਬੀ)
- Odia (ଓଡ଼ିଆ)
- Assamese (অসমীয়া)
- Urdu (اردو)

### Regional Languages
- Marwadi (मारवाड़ी)
- Haryanvi (हरियाणवी)
- Bhojpuri (भोजपुरी)
- Awadhi (अवधी)
- Magahi (मगही)
- Kashmiri (कश्मीरी)
- Dogri (डोगरी)
- Konkani (कोंकणी)
- Manipuri (মৈতৈলোন্)
- Sanskrit (संस्कृतम्)

### International Languages
- English
- Spanish
- French
- German
- Italian
- Portuguese
- Russian
- Japanese
- Korean
- Chinese
- Arabic

## 🔧 Configuration

### Environment Variables
- `NODE_ENV`: Set to 'production' for deployed version
- `API_BASE_URL`: Your backend API URL

### API Configuration
The app automatically switches between local and production API URLs based on the environment.

## 📱 Usage

1. **Select Source Language**: Choose the language you want to translate from
2. **Select Target Language**: Choose the language you want to translate to
3. **Enter Text**: Type or paste your text in the input box
4. **Translate**: Click the translate button or use Ctrl+Enter
5. **Copy/Speak**: Use the copy or speak buttons for the translation

### Keyboard Shortcuts
- `Ctrl+Enter`: Translate
- `Ctrl+C`: Copy translation
- `Ctrl+S`: Swap languages
- `Ctrl+H`: Toggle history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Translate API for translation services
- React and Flask communities
- Indian language experts for regional dialect support 