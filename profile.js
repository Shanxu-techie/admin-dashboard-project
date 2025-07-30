import { highlightCurrentPage } from "./assets/sections/scripts/highlight-current.js";
import { fetchSection } from "./assets/sections/scripts/include.js";
import { createDonutProgress } from "./assets/sections/scripts/createDonutProgress.js";
import {updateToggleState} from "./assets/sections/scripts/update-toggle.js";

window.addEventListener("DOMContentLoaded", async () => {
    await fetchSection("sidebar-container", "assets/sections/partials/sidebar.html");
    await fetchSection("footer-container", "assets/sections/partials/footer.html");
    await fetchSection("breadcrumbs-container", "assets/sections/partials/breadcrumbs.html");
    highlightCurrentPage();

    createDonutProgress(document.getElementById("green-donut"), {
        percent: 0.70,
        showBg: false,
        gradientStops: [
            { stop: 0, color: "rgba(5, 205, 153, 0)" },
            { stop: 0.1, color: "rgba(5, 205, 153, 0)" },
            { stop: 0.25, color: "rgba(5, 205, 153, 0.3)" },
            { stop: 0.5, color: "#05CD99" },
            { stop: 1, color: "#05CD99" }
        ]
    });
});

document.querySelectorAll(".toggle-switch").forEach((toggle) => {
    updateToggleState(toggle);
    toggle.addEventListener("change", () => {
        updateToggleState(toggle);
    });
});