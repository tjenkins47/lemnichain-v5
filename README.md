# LemniChain Web Wallet Project

This repository contains the full project structure for the **LemniChain Web Wallet and Documentation Interface**, including HTML, CSS, JavaScript, Flask integration, and upcoming WebAssembly (WASM) modules.

---

## 🔍 Project Overview

This codebase is organized as a hybrid Flask + static HTML application designed to support:

- A quantum-secure wallet interface (`create_wallet.html`, `lemni_wallet.html`)
- Introductory and research documentation
- A dynamic navbar system via `main.js`
- Local Flask rendering via Jinja2 templates
- Future browser-based WASM cryptographic integration

---

## 📁 Directory Structure

```
LemniChain/
└── lemni/
    ├── static/
    │   ├── css/
    │   ├── graphics/
    │   ├── html/
    │   ├── js/
    │   └── pdfs/
    ├── templates/           # Jinja2 HTML templates (rendered by Flask)
    ├── wasm/                # Contains keygen.wasm and related files
    ├── web_wallet.py        # Flask app entry point
    
```

---

## 🌐 How to View Locally

To run the project using Flask:

```bash
cd lemni
set FLASK_APP=web_wallet.py        # Or use 'export' on macOS/Linux
flask run
```

Then open your browser to:

```
http://127.0.0.1:5000/

---

## ⚠️ GitHub Limitations

This GitHub repository hosts the full **source code and structure**, but:

- GitHub **does not run Flask** or Python code
- Interactive functionality (wallet generation, signing, WASM modules) will not function until deployed on a proper Flask server

Static pages like `intro.html`, `create_wallet.html`, and `lemni_wallet.html` can still be previewed directly from the repository, but **only as static HTML**.

---

## ✅ Current Status

- `intro.html` has been updated with the latest security assessment
- Navbar and styling are fully functional
- Awaiting WASM integration for wallet key generation and signing

---

