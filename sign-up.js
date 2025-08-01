import { authUser } from "./components/scripts/auth.js";
import { fetchSection } from "./components/scripts/include.js";
import { showFail, showSuccess } from "./components/scripts/showToasts.js";
import { updateToggleState } from "./components/scripts/update-toggle.js";
import { emailValidate, passwordValidate, nameValidate } from "./components/scripts/validation.js";

window.addEventListener("DOMContentLoaded", async () => {
    await fetchSection("header-container", "components/partials/header.html");
    await fetchSection("footer-container", "components/partials/footer.html");
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