import json, os, re
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

FILE = os.path.join(os.path.dirname(__file__), "messages.json")


def load():
    if not os.path.exists(FILE):
        return []
    with open(FILE, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/api/health")
def health():
    return jsonify(status="ok")


@app.post("/api/contact")
def contact():
    data = request.get_json(silent=True) or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not (name and email and message):
        return jsonify(error="All fields are required."), 400
    if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
        return jsonify(error="Invalid email address."), 400

    messages = load()
    messages.append({"name": name, "email": email, "message": message,
                     "time": datetime.now().isoformat(timespec="seconds")})
    with open(FILE, "w", encoding="utf-8") as f:
        json.dump(messages, f, indent=2)
    return jsonify(ok=True), 201


if __name__ == "__main__":
    app.run(port=5000, debug=True)
