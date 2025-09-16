document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  const checkNavbar = setInterval(() => {
    if (document.getElementById("langToggle")) {
      clearInterval(checkNavbar);
      initLangToggle();
    }
  }, 100);
});

// THEME TOGGLE
function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  const icon = toggle?.querySelector("i");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    if (icon) icon.classList.replace("bi-moon-fill", "bi-sun-fill");
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      if (icon) {
        icon.classList.toggle("bi-moon-fill", !isDark);
        icon.classList.toggle("bi-sun-fill", isDark);
      }
    });
  }
}

// LANGUAGE TOGGLE
function initLangToggle() {
  const langButton = document.getElementById("langToggle");
  const langLabel = document.getElementById("langLabel");
  if (!langButton || !langLabel) return;

  const savedLang = localStorage.getItem("selectedLang") || "EN";
  langButton.textContent = savedLang;

  const translations = {
    EN: {
      home: "Home",
      intro: "Introduction", wallet: "Wallet", node: "Node",
      governance: "Governance", research: "Research", team: "Our Team",
      quantum: "Quantum Security", security: "Security Audits",
      api: "API Reference", help: "How to / FAQ / Guide",
      langLabel: "Languages"
    },
    FR: {
      home: "Accueil",
      intro: "Présentation", wallet: "Portefeuille", node: "Nœud",
      governance: "Gouvernance", research: "Recherche", team: "Notre Équipe",
      quantum: "Sécurité Quantique", security: "Audits de Sécurité",
      api: "Référence de l’API", help: "Guide / Foire aux Questions",
      langLabel: "Langues"
    },
    ES: {
      home: "Inicio",
      intro: "Presentación", wallet: "Monedero digital", node: "Nodo",
      governance: "Gobernanza", research: "Investigación", team: "Nuestro Equipo",
      quantum: "Seguridad Cuántica", security: "Auditorías de Seguridad",
      api: "Referencia de la API", help: "Guía / Preguntas Frecuentes",
      langLabel: "Idiomas"
    }
  };

  function updateNavbarLanguage(lang) {
    const dict = translations[lang];

    if (document.getElementById("nav-home"))
      document.getElementById("nav-home").textContent = dict.home;
    if (document.getElementById("nav-intro"))
      document.getElementById("nav-intro").textContent = dict.intro;
    if (document.getElementById("nav-wallet"))
      document.getElementById("nav-wallet").textContent = dict.wallet;
    if (document.getElementById("nav-node"))
      document.getElementById("nav-node").textContent = dict.node;
    if (document.getElementById("nav-governance"))
      document.getElementById("nav-governance").textContent = dict.governance;
    if (document.getElementById("nav-research"))
      document.getElementById("nav-research").textContent = dict.research;
    if (document.getElementById("nav-team"))
      document.getElementById("nav-team").textContent = dict.team;
    if (document.getElementById("nav-quantum"))
      document.getElementById("nav-quantum").textContent = dict.quantum;
    if (document.getElementById("nav-security"))
      document.getElementById("nav-security").textContent = dict.security;
    if (document.getElementById("nav-api"))
      document.getElementById("nav-api").textContent = dict.api;
    if (document.getElementById("nav-help"))
      document.getElementById("nav-help").textContent = dict.help;

    if (document.getElementById("langLabel"))
      document.getElementById("langLabel").textContent = dict.langLabel;

    // 🔑 Update homepage hero image
    const heroImages = {
      EN: "/static/graphics/Homepage_EN.jpg",
      FR: "/static/graphics/Homepage_FR.jpg",
      ES: "/static/graphics/Homepage_ES.jpg"
    };
    const hero = document.getElementById("homepageHero");
    if (hero) {
      hero.src = heroImages[lang];
    }
  }

  // Apply saved language immediately
  updateNavbarLanguage(savedLang);

  // Handle selection
  document.querySelectorAll(".lang-option").forEach(option => {
    option.addEventListener("click", function (e) {
      e.preventDefault();
      const selected = this.dataset.lang;
      localStorage.setItem("selectedLang", selected);
      langButton.textContent = selected;
      updateNavbarLanguage(selected);
    });
  });
}

// MOCK key generator (replace with WASM later)
function generateKeysMock() {
  return {
    dilithium: "DILITHIUM_PUBLIC_ABC123",
    lemon_skate: "LEMON_SKATE_PUBLIC_DEF456"
  };
}

async function generateKeys() {
  return generateKeysMock();
}

// Submit wallet form
async function submitWalletForm(event) {
  event.preventDefault();

  const memoInput = document.getElementById("memo");
  const memo = memoInput.value.trim();

  const status = document.getElementById("statusMessage");
  status.textContent = "⏳ Generating keys...";

  try {
    const keys = await generateKeys();
    const wallet_id = await sha256(keys.dilithium + keys.lemon_skate);

    const payload = {
      wallet_id,
      memo,
      public_keys: {
        dilithium: keys.dilithium,
        lemon_skate: keys.lemon_skate
      }
    };

    const response = await fetch("/register_key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result.status === "success") {
      status.style.color = "#4CAF50";
      status.textContent = "✅ Wallet created successfully!";
    } else {
      status.style.color = "#F44336";
      status.textContent = "❌ Failed to register wallet: " + result.message;
    }
  } catch (err) {
    console.error("Wallet creation error:", err);
    status.style.color = "#F44336";
    status.textContent = "❌ Error: " + err.message;
  }
}

// Utility: SHA-256 hash
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}
