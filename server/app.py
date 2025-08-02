from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import urllib.parse
import re
import os

app = Flask(__name__)
CORS(app)  # To allow requests from React frontend

def split_into_sentences(text):
    """Split text into sentences while preserving punctuation"""
    # Split by sentence endings (.!?) followed by space or end of string
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    # Filter out empty sentences
    return [s.strip() for s in sentences if s.strip()]

def translate_text(text, source_lang, target_lang):
    """Translate text using Google Translate API"""
    try:
        encoded_text = urllib.parse.quote(text)
        api_url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl={source_lang}&tl={target_lang}&dt=t&q={encoded_text}"
        
        response = requests.get(api_url, timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            if result and len(result) > 0 and len(result[0]) > 0:
                return result[0][0][0]  # Extract the translated text
        return None
    except Exception as e:
        print(f"Error translating text '{text}': {e}")
        return None

@app.route('/api/translate', methods=['POST'])
def translate():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data received"}), 400
        
        text = data.get('text', '')
        source_lang = data.get('source', 'en')
        target_lang = data.get('target', 'hi')
        
        if not text:
            return jsonify({"error": "No text provided"}), 400

        print(f"Translating from {source_lang} to {target_lang}: {text[:100]}...")
        
        # Split text into sentences
        sentences = split_into_sentences(text)
        print(f"Split into {len(sentences)} sentences")
        
        if len(sentences) == 1:
            # Single sentence - translate directly
            translated = translate_text(text, source_lang, target_lang)
            if translated:
                return jsonify({"translatedText": translated})
            else:
                return jsonify({"error": "Translation failed"}), 500
        else:
            # Multiple sentences - translate each separately
            translated_sentences = []
            for sentence in sentences:
                translated_sentence = translate_text(sentence, source_lang, target_lang)
                if translated_sentence:
                    translated_sentences.append(translated_sentence)
                else:
                    # If translation fails for a sentence, keep the original
                    translated_sentences.append(sentence)
            
            # Combine all translated sentences
            final_translation = " ".join(translated_sentences)
            return jsonify({"translatedText": final_translation})
            
    except requests.exceptions.RequestException as e:
        error_msg = f"Network error: {str(e)}"
        print(error_msg)
        return jsonify({"error": error_msg}), 500
    except Exception as e:
        error_msg = f"Unexpected error: {str(e)}"
        print(error_msg)
        return jsonify({"error": error_msg}), 500

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Translation API is running"})

if __name__ == '__main__':
    # For local development
    app.run(debug=True)
else:
    # For Vercel deployment
    app.debug = False
