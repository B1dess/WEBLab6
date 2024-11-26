from flask import Flask, request, jsonify
from flask_cors import CORS  # Імпортуємо CORS
import os
import json

app = Flask(__name__)
CORS(app)
TABS_FILE = "tabs.json"


@app.route('/save-tabs', methods=['POST'])
def save_tabs():
    try:
        tabs = request.get_json()
        with open(TABS_FILE, "w") as file:
            json.dump(tabs, file)
        return jsonify({"message": "Tabs saved successfully!"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route('/load-tabs', methods=['GET'])
def load_tabs():
    if os.path.exists(TABS_FILE):
        with open(TABS_FILE, "r") as file:
            tabs = json.load(file)
        return jsonify(tabs), 200
    else:
        return jsonify([]), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)