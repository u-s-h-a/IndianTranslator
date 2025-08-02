import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// API URL configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-app-name.vercel.app/api' 
  : 'http://localhost:5000';

function App() {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("hi");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Language options with Indian languages
  const languages = {
    // International Languages
    en: "English",
    // es: "Spanish",
    // fr: "French",
    // de: "German",
    // it: "Italian",
    // pt: "Portuguese",
    // ru: "Russian",
    // ja: "Japanese",
    // ko: "Korean",
    // zh: "Chinese",
    // ar: "Arabic",
    
    // Indian Languages
    hi: "Hindi",
    bn: "Bengali",
    te: "Telugu",
    ta: "Tamil",
    mr: "Marathi",
    gu: "Gujarati",
    kn: "Kannada",
    ml: "Malayalam",
    pa: "Punjabi",
    or: "Odia",
    as: "Assamese",
    ur: "Urdu",
    ne: "Nepali",
    si: "Sinhala",
    my: "Myanmar",
    th: "Thai",
    vi: "Vietnamese",
    id: "Indonesian",
    ms: "Malay",
    tl: "Filipino",
    
    // Regional Indian Languages
    "hi-mr": "Marwadi",
    "hi-hr": "Haryanvi",
    "hi-br": "Bhojpuri",
    "hi-aw": "Awadhi",
    "hi-mg": "Magahi",
    "hi-ka": "Kashmiri",
    "hi-dg": "Dogri",
    "hi-kn": "Konkani",
    "hi-mn": "Manipuri",
    "hi-sa": "Sanskrit"
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    setCharCount(newText.length);
    setWordCount(newText.trim().split(/\s+/).filter(word => word.length > 0).length);
    setError("");

    // Auto-translate feature
    if (autoTranslate && newText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  };

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError("Please enter some text to translate");
      setTranslation("");
      return;
    }

    setError("");
    setIsLoading(true);
    setTranslation("");

    try {
      // For regional languages, we'll use a different approach
      let sourceLang = sourceLanguage;
      let targetLang = targetLanguage;
      
      // Check if we're dealing with regional languages
      const isRegionalSource = sourceLang.includes('-');
      const isRegionalTarget = targetLang.includes('-');

      if (isRegionalSource || isRegionalTarget) {
        // For regional languages, we'll use a multi-step translation approach
        // First translate to English, then to the target regional language
        let intermediateTranslation = text;
        
        if (isRegionalSource) {
          // If source is regional, first translate to English
          const englishRes = await axios.post(`${API_BASE_URL}/translate`, {
            text: text,
            source: "hi", // Use Hindi as intermediate
            target: "en"
          });
          intermediateTranslation = englishRes.data.translatedText;
        }
        
        if (isRegionalTarget) {
          // If target is regional, translate from English to Hindi with regional modifications
          const hindiRes = await axios.post(`${API_BASE_URL}/translate`, {
            text: intermediateTranslation,
            source: "en",
            target: "hi"
          });
          
          // Apply regional language modifications
          let regionalTranslation = hindiRes.data.translatedText;
          
          // Apply regional language specific modifications
          if (targetLang === "hi-mr") {
            // Marwadi modifications
            regionalTranslation = applyMarwadiModifications(regionalTranslation);
          } else if (targetLang === "hi-hr") {
            // Haryanvi modifications
            regionalTranslation = applyHaryanviModifications(regionalTranslation);
          } else if (targetLang === "hi-br") {
            // Bhojpuri modifications
            regionalTranslation = applyBhojpuriModifications(regionalTranslation);
          }
          
          setTranslation(regionalTranslation);
        } else {
          setTranslation(intermediateTranslation);
        }
      } else {
        // Standard translation for non-regional languages
        const res = await axios.post(`${API_BASE_URL}/translate`, {
          text: text,
          source: sourceLang,
          target: targetLang
        });
        
        setTranslation(res.data.translatedText);
      }
      
      // Add to history
      addToHistory(text, translation, sourceLanguage, targetLanguage);
      
    } catch (err) {
      console.error("Translation error:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(`Translation failed: ${err.response.data.error}`);
      } else {
        setError("Translation failed. Please try again.");
      }
      setTranslation("");
    } finally {
      setIsLoading(false);
    }
  };

  // Regional language modification functions
  const applyMarwadiModifications = (hindiText) => {
    // Marwadi specific word replacements and modifications
    let marwadiText = hindiText;
    
    // Common Marwadi word replacements
    const marwadiReplacements = {
      'है': 'है',
      'में': 'में',
      'का': 'रो',
      'की': 'री',
      'के': 'रा',
      'हैं': 'हैं',
      'कर': 'कर',
      'करो': 'करो',
      'जाओ': 'जाओ',
      'आओ': 'आओ',
      'मेरा':'मारा',
      
    };
    
    Object.entries(marwadiReplacements).forEach(([hindi, marwadi]) => {
      marwadiText = marwadiText.replace(new RegExp(hindi, 'g'), marwadi);
    });
    
    return marwadiText;
  };

  const applyHaryanviModifications = (hindiText) => {
    // Haryanvi specific word replacements and modifications
    let haryanviText = hindiText;
    
    // Common Haryanvi word replacements
    const haryanviReplacements = {
      'है': 'सै',
      'में': 'में',
      'का': 'का',
      'की': 'की',
      'के': 'के',
      'हैं': 'सैं',
      'कर': 'कर',
      'करो': 'करो',
      'जाओ': 'जाओ',
      'आओ': 'आओ'
    };
    
    Object.entries(haryanviReplacements).forEach(([hindi, haryanvi]) => {
      haryanviText = haryanviText.replace(new RegExp(hindi, 'g'), haryanvi);
    });
    
    return haryanviText;
  };

  const applyBhojpuriModifications = (hindiText) => {
    // Bhojpuri specific word replacements and modifications
    let bhojpuriText = hindiText;
    
    // Common Bhojpuri word replacements
    const bhojpuriReplacements = {
      'है': 'बा',
      'में': 'में',
      'का': 'का',
      'की': 'की',
      'के': 'के',
      'हैं': 'बानी',
      'कर': 'कर',
      'करो': 'करो',
      'जाओ': 'जाओ',
      'आओ': 'आओ'
    };
    
    Object.entries(bhojpuriReplacements).forEach(([hindi, bhojpuri]) => {
      bhojpuriText = bhojpuriText.replace(new RegExp(hindi, 'g'), bhojpuri);
    });
    
    return bhojpuriText;
  };

  const addToHistory = (original, translated, source, target) => {
    const historyItem = {
      id: Date.now(),
      original,
      translated,
      source,
      target,
      timestamp: new Date().toLocaleString()
    };
    
    setHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10 items
  };

  const loadFromHistory = (item) => {
    setText(item.original);
    setTranslation(item.translated);
    setSourceLanguage(item.source);
    setTargetLanguage(item.target);
    setShowHistory(false);
  };

  const handleClear = () => {
    setText("");
    setTranslation("");
    setError("");
    setCharCount(0);
    setWordCount(0);
  };

  const handleCopyTranslation = () => {
    if (translation) {
      navigator.clipboard.writeText(translation);
      // You could add a toast notification here
    }
  };

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setText(translation);
    setTranslation("");
  };

  const speakText = (text, language) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Map language codes to speech synthesis language codes
      let speechLang = 'en-US';
      if (language.startsWith('hi')) {
        speechLang = 'hi-IN';
      } else if (language === 'bn') {
        speechLang = 'bn-IN';
      } else if (language === 'te') {
        speechLang = 'te-IN';
      } else if (language === 'ta') {
        speechLang = 'ta-IN';
      } else if (language === 'mr') {
        speechLang = 'mr-IN';
      } else if (language === 'gu') {
        speechLang = 'gu-IN';
      } else if (language === 'kn') {
        speechLang = 'kn-IN';
      } else if (language === 'ml') {
        speechLang = 'ml-IN';
      } else if (language === 'pa') {
        speechLang = 'pa-IN';
      } else if (language === 'ur') {
        speechLang = 'ur-PK';
      } else {
        speechLang = language === 'en' ? 'en-US' : language;
      }
      
      utterance.lang = speechLang;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 'Enter':
            e.preventDefault();
            handleTranslate();
            break;
          case 'c':
            if (translation) {
              e.preventDefault();
              handleCopyTranslation();
            }
            break;
          case 's':
            e.preventDefault();
            handleSwapLanguages();
            break;
          case 'h':
            e.preventDefault();
            setShowHistory(!showHistory);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [translation, showHistory]);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🌐 Indian Multi-Language Translator</h1>
          <p>Translate between Indian languages and international languages</p>
        </header>

        <div className="controls-section">
          <div className="language-controls">
            <div className="language-selector">
              <label>From:</label>
              <select 
                value={sourceLanguage} 
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="language-select"
              >
                <optgroup label="International Languages">
                  {Object.entries(languages).filter(([code]) => !code.includes('-') && !['hi', 'bn', 'te', 'ta', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur', 'ne', 'si', 'my', 'th', 'vi', 'id', 'ms', 'tl'].includes(code)).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </optgroup>
                <optgroup label="Indian Languages">
                  {Object.entries(languages).filter(([code]) => ['hi', 'bn', 'te', 'ta', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur', 'ne', 'si', 'my', 'th', 'vi', 'id', 'ms', 'tl'].includes(code)).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </optgroup>
                <optgroup label="Regional Languages">
                  {Object.entries(languages).filter(([code]) => code.includes('-')).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
            
            <button 
              onClick={handleSwapLanguages}
              className="swap-btn"
              title="Swap languages (Ctrl+S)"
            >
              🔄
            </button>
            
            <div className="language-selector">
              <label>To:</label>
              <select 
                value={targetLanguage} 
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="language-select"
              >
                <optgroup label="International Languages">
                  {Object.entries(languages).filter(([code]) => !code.includes('-') && !['hi', 'bn', 'te', 'ta', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur', 'ne', 'si', 'my', 'th', 'vi', 'id', 'ms', 'tl'].includes(code)).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </optgroup>
                <optgroup label="Indian Languages">
                  {Object.entries(languages).filter(([code]) => ['hi', 'bn', 'te', 'ta', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur', 'ne', 'si', 'my', 'th', 'vi', 'id', 'ms', 'tl'].includes(code)).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </optgroup>
                <optgroup label="Regional Languages">
                  {Object.entries(languages).filter(([code]) => code.includes('-')).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div className="feature-controls">
            <label className="auto-translate">
              <input 
                type="checkbox" 
                checked={autoTranslate}
                onChange={(e) => setAutoTranslate(e.target.checked)}
              />
              Auto-translate
            </label>
            
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="history-btn"
              title="Show history (Ctrl+H)"
            >
              📚 History
            </button>
          </div>
        </div>

        <div className="translation-container">
          {/* Input Section */}
          <div className="input-section">
            <div className="section-header">
              <h2>📝 {languages[sourceLanguage]} Text</h2>
              <div className="counts">
                <span className="char-count">{charCount} chars</span>
                <span className="word-count">{wordCount} words</span>
              </div>
            </div>
            <div className="textarea-container">
              <textarea
                value={text}
                onChange={handleTextChange}
                placeholder={`Enter your ${languages[sourceLanguage]} text here...`}
                className="text-input"
                rows="6"
              />
              <div className="input-actions">
                <button 
                  onClick={handleTranslate} 
                  className="translate-btn"
                  disabled={isLoading || !text.trim()}
                  title="Translate (Ctrl+Enter)"
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Translating...
                    </>
                  ) : (
                    <>
                      🔄 Translate
                    </>
                  )}
                </button>
                <button 
                  onClick={() => speakText(text, sourceLanguage)}
                  className="speak-btn"
                  disabled={!text.trim() || isSpeaking}
                  title="Speak text"
                >
                  {isSpeaking ? "🔇" : "🔊"}
                </button>
                <button 
                  onClick={handleClear} 
                  className="clear-btn"
                  disabled={!text && !translation}
                >
                  🗑️ Clear
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="output-section">
            <div className="section-header">
              <h2>🇮🇳 {languages[targetLanguage]} Translation</h2>
              <div className="output-actions">
                {translation && (
                  <>
                    <button 
                      onClick={handleCopyTranslation}
                      className="copy-btn"
                      title="Copy translation (Ctrl+C)"
                    >
                      📋 Copy
                    </button>
                    <button 
                      onClick={() => speakText(translation, targetLanguage)}
                      className="speak-btn"
                      disabled={isSpeaking}
                      title="Speak translation"
                    >
                      {isSpeaking ? "🔇" : "🔊"}
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="translation-output">
              {isLoading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Translating your text...</p>
                </div>
              ) : translation ? (
                <div className="translated-text">
                  {translation}
                </div>
              ) : (
                <div className="placeholder">
                  Your {languages[targetLanguage]} translation will appear here...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="history-panel">
            <h3>📚 Translation History</h3>
            {history.length === 0 ? (
              <p className="no-history">No translation history yet.</p>
            ) : (
              <div className="history-list">
                {history.map((item) => (
                  <div key={item.id} className="history-item" onClick={() => loadFromHistory(item)}>
                    <div className="history-languages">
                      {languages[item.source]} → {languages[item.target]}
                    </div>
                    <div className="history-text">
                      <div className="history-original">{item.original}</div>
                      <div className="history-translated">{item.translated}</div>
                    </div>
                    <div className="history-time">{item.timestamp}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
