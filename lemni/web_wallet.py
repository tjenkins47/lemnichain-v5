from flask import Flask, request, jsonify, send_from_directory, render_template, redirect, url_for
from flask_cors import CORS
import os
import uuid

# === Path Setup ===
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
STATIC_DIR = os.path.join(BASE_DIR, 'static')
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')

app = Flask(__name__, static_folder=STATIC_DIR, template_folder=TEMPLATES_DIR)
CORS(app)

# === Global Constants Available in Templates ===
@app.context_processor
def inject_globals():
    return {
        "STATIC_URL": url_for('static', filename=''),
        "ROUTES": {
            'home': url_for('homepage'),
            'intro': '/intro',
            'wallet': '/wallet',
            'node': '/node',
            'governance': '/governance',
            'quantum': '/quantum',
            'security': '/security',
            'api': '/api'
        }
    }

# === Static Home Page ===
@app.route('/')
def homepage():
    return send_from_directory(STATIC_DIR, 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(STATIC_DIR, filename)

# === Page Routes ===
@app.route('/intro')
def intro():
    return render_template("intro.html")

@app.route('/wallet')
def wallet_page():
    return render_template("wallet.html")

@app.route("/create_wallet.html")
def create_wallet():
    return render_template("create_wallet.html")
    
@app.route("/lemni_wallet.html")
def lemni_wallet():
    return render_template("lemni_wallet.html")

@app.route('/node')
def node():
    return render_template("node.html")

@app.route('/governance')
def governance():
    return render_template("governance.html")

@app.route('/quantum')
def quantum():
    return render_template("quantum.html")

@app.route('/security')
def security():
    return render_template("security.html")

@app.route('/api')
def api():
    return render_template("api.html")
    
@app.route("/LemniChain_Security_Analysis.html")
def lemnichain_security():
    return render_template("LemniChain_Security_Analysis.html")

@app.route("/QuantumSecurityComparison.html")
def quantum_security():
    return render_template("QuantumSecurityComparison.html")
    

# === In-Memory Wallet Store (Mock) ===
wallets = {}

# === Wallet Registration API ===
@app.route('/register_key', methods=['POST'])
def register_key():
    data = request.get_json()
    wallet_id = data.get('wallet_id')
    public_keys = data.get('public_keys')
    memo = data.get('memo')

    print("✅ Received wallet registration:")
    print(f"Wallet ID: {wallet_id}")
    print(f"Memo: {memo}")
    print(f"Public Keys: {public_keys}")

    wallets[wallet_id] = {
        "memo": memo,
        "balance": 123.456,
        "confirmed_balance": 123.456,
        "projected_balance": 130.000,
        "confirmed_stake": 50,
        "projected_stake": 55,
        "transactions": []
    }

    return jsonify({"status": "success", "message": "Wallet registered"})

# === Wallet View ===
@app.route('/wallet/<wallet_id>', methods=['GET'])
def wallet_view(wallet_id):
    wallet = wallets.get(wallet_id)
    if not wallet:
        return f"Wallet ID {wallet_id} not found", 404

    def get_wallet_display_data(wallet_id, wallet):
        return wallet

    return render_template(
        "lemni_wallet.html",
        wallet_id=wallet_id,
        wallet=wallet,
        get_wallet_display_data=get_wallet_display_data,
        is_validator=True,
        is_current_validator=True,
        current_validator="ABCD1234",
        send_form={},
        validator_form={},
        GOVERNANCE_PARAMS={"min_stake": 10, "time_for_validation": 30},
        mempool=[],
        governance={"active": []}
    )

# === Run App ===
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
