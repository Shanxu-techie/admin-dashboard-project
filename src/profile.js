import { fetchSection } from "../components/scripts/include.js";
import { createDonutProgress } from "../components/scripts/createDonutProgress.js";
import {updateToggleState} from "../components/scripts/update-toggle.js";
import { initSidebar } from "../components/scripts/sidebar.js";
import { updateText } from "../components/scripts/updatePageBreadCrumb.js";

window.addEventListener("DOMContentLoaded", async () => {
    await fetchSection("sidebar-container", "components/partials/sidebar.html");
    await fetchSection("footer-container", "components/partials/footer.html");
    await fetchSection("breadcrumbs-container", "components/partials/breadcrumbs.html");
    initSidebar();
    updateText();

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