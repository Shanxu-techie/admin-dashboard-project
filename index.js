import { fetchSection } from "./assets/sections/scripts/include.js";
import { showFail, showSuccess } from "./assets/sections/scripts/showToasts.js";
import { updateToggleState } from "./assets/sections/scripts/update-toggle.js";
import { emailValidate, passwordValidate } from "./assets/sections/scripts/validation.js";
import { authUser } from "./assets/sections/scripts/auth.js";

window.addEventListener("DOMContentLoaded", async () => {
    await fetchSection("header-container", "assets/sections/partials/header.html");
    await fetchSection("footer-container", "assets/sections/partials/footer.html");

    await attemptAutoLogin();
    document.getElementById("email")?.focus();
});

document.querySelectorAll(".toggle-switch").forEach((toggle) => {
    toggle.addEventListener("change", () => updateToggleState(toggle));
});

document.querySelector("form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const remember = document.getElementById("remember-switch").checked;

    if (!emailValidate(email) | !passwordValidate(password)) {
        return;
    }
    try {
        const res = await authUser("login",{email, password, remember});

        let data;
        try {
            data = await res.json();
        } catch {
            throw new Error("Server returned invalid response");
        }

        if (!res.ok) throw new Error(data.message || "Login failed");

        showSuccess("Login Successful.", "dashboard.html");

    } catch (err) {
        showFail(err.message);
    }
});

async function attemptAutoLogin() {
    try {
        const refreshRes = await fetch("/api/refresh", {
            method: "POST",
            credentials: "include",
        });

        if (!refreshRes.ok) throw new Error("Not logged in");

        const refreshData = await refreshRes.json();
        const accessToken = refreshData.accessToken;

        const profileRes = await fetch("/api/profile", {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        });

        if (!profileRes.ok) throw new Error("Could not fetch profile");

        const user = await profileRes.json();
        showSuccess(`Welcome back, ${user.name}!`, "dashboard.html");

    } catch (err) {
        console.warn("Auto-login skipped:", err.message);
    }
}