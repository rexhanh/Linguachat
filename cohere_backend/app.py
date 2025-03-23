from flask import Flask, request, jsonify
import cohere
import os
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Flask app setup
app = Flask(__name__)
CORS(app)

# Supported languages
SUPPORTED_LANGUAGES = ["english", "chinese", "spanish", "japanese", "french"]

# Initialize Cohere
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(COHERE_API_KEY)
formatted_history = []

@app.route('/select-language', methods=['POST'])
def select_language():
    data = request.get_json()
    selected_language = data.get("language", "").lower()
    formatted_history.clear()
    formatted_history.append({
                "role": "system",
                "message": """Assume the user's native language is English. 
                You are a helpful language tutor assisting the user in learning {}. 
                Tell the user that you are going to start a conversation in a restaurant, you are the waiter, and the user is the customer.
                Try to be realistic and ask the user some questions that a waiter would ask.
                Try to blend in some words in the language that the user wants to learn.
                Try to high light some of the important words, and put them in bold and show the translation.""".format(selected_language.capitalize())
            })
    response = co.chat(
        message="I want to learn {}".format(selected_language),
        chat_history=formatted_history,
        model="command-a-03-2025"
    )
    formatted_history.append({
        "role": "user",
        "message": "I want to learn {}".format(selected_language)
    })
    formatted_history.append({
        "role": "chatbot",
        "message": response.text
    })

    return jsonify({
        "message": response.text,
    })


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()

    message = data.get("message", "")

    # Generate response using Cohere chat
    response = co.chat(
        message=message,
        chat_history=formatted_history,
        model="command-a-03-2025"
    )
    formatted_history.append({
        "role": "user",
        "message": message
    })
    formatted_history.append({
        "role": "chatbot",
        "message": response.text
    })

    return jsonify({
        "message": response.text
    })


@app.route('/languages', methods=['GET'])
def get_languages():
    return jsonify({"supported_languages": SUPPORTED_LANGUAGES})


if __name__ == '__main__':
    app.run(debug=True)
