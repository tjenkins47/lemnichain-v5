document.addEventListener("DOMContentLoaded", () => {
  initTheme();
});

// Initialize the theme toggle button and apply saved theme
function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    const icon = toggle?.querySelector("i");

    // Apply saved theme
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
// --------------------------------------------------
// MOCK key generator (replace with WASM later)
// --------------------------------------------------
function generateKeysMock() {
    return {
        dilithium: "DILITHIUM_PUBLIC_ABC123",
        lemon_skate: "LEMON_SKATE_PUBLIC_DEF456"
    };
}

async function generateKeys() {
    // This function becomes the WASM-ready version later
    return generateKeysMock();
}

// --------------------------------------------------
// Submit wallet form from create_wallet.html
// --------------------------------------------------
async function submitWalletForm(event) {
    event.preventDefault();

    const memoInput = document.getElementById("memo");
    const memo = memoInput.value.trim();

    const status = document.getElementById("statusMessage");
    status.textContent = "⏳ Generating keys...";

    try {
        const keys = await generateKeys();  // currently returns mock keys
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

// --------------------------------------------------
// Utility: SHA-256 hash (wallet ID generator)
// --------------------------------------------------
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}
