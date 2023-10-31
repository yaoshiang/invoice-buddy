from flask import Flask, jsonify, request, session
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'some_secret_key'  # TODO: Update to a managed secrets system.
CORS(app)


@app.route('/login', methods=['POST'])
def login():
  username = request.json.get('username')
  password = request.json.get('password')
  if username:  # Assume any non-empty username is valid for now.
    session['user'] = username
    return jsonify(success=True, message="Logged in successfully"), 200
  return jsonify(success=False, message="Invalid username"), 400


@app.route('/logout', methods=['GET'])
def logout():
  session['user'] = None
  return jsonify(success=True, message="Logged out successfully"), 200


@app.route('/status', methods=['GET'])
def status():
  user = session.get('user')
  if user:
    return jsonify(is_authenticated=True, user=user), 200
  return jsonify(is_authenticated=False), 401


@app.route('/form', methods=['POST', 'GET'])
def form():
  user = session.get('user')
  if not user:
    return jsonify(is_authenticated=False), 401
  else:
    return jsonify(is_authenticated=True,
                   user=user,
                   result="placeholder result!"), 200


@app.route("/hello-world")
def hello_world():
  return "<p>Hello, World!</p>"
