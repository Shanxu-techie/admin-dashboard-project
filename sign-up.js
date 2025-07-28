import { authUser } from "./assets/sections/scripts/auth.js";
import { fetchSection } from "./assets/sections/scripts/include.js";
import { showFail, showSuccess } from "./assets/sections/scripts/showToasts.js";
import { updateToggleState } from "./assets/sections/scripts/update-toggle.js";
import { emailValidate, passwordValidate, nameValidate } from "./assets/sections/scripts/validation.js";

window.addEventListener("DOMContentLoaded", async () => {
    await fetchSection("header-container", "assets/sections/partials/header.html");
    await fetchSection("footer-container", "assets/sections/partials/footer.html");
});

document.querySelectorAll(".toggle-switch").forEach((toggle) => {
    toggle.addEventListener("change", () => updateToggleState(toggle));
});

document.getElementById("google-login").addEventListener("click", () => {
    window.location.href = "http://localhost:3000/api/auth/google";
});

document.getElementById("facebook-login").addEventListener("click", () => {
    window.location.href = "http://localhost:3000/api/auth/facebook";
});

document.getElementById("apple-login").addEventListener("click", () => {
    window.location.href = "http://localhost:3000/api/auth/apple";
});

document.querySelector("form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const remember = document.getElementById("remember-switch").checked;

    if (!nameValidate(name) | !emailValidate(email) | !passwordValidate(password)) {
        return;
    }

    try {
        const res = await authUser("register", { name, email, password, remember });

        let data;
        try {
            data = await res.json();
        } catch {
            throw new Error("Server returned invalid response");
        }

        if (!res.ok) {
            throw new Error(data.message || "Registration failed");
        }
        showSuccess("Sign Up Successful!", "index.html");

    } catch (err) {
        showFail(err.message);
    }
});