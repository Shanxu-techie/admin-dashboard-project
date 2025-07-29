import { highlightCurrentPage } from "./assets/sections/scripts/highlight-current.js";
import { fetchSection } from "./assets/sections/scripts/include.js";

window.addEventListener("DOMContentLoaded", async () => {
    await fetchSection("sidebar-container", "assets/sections/partials/sidebar.html");
    await fetchSection("footer-container", "assets/sections/partials/footer.html");
    await fetchSection("breadcrumbs-container", "assets/sections/partials/breadcrumbs.html");
    highlightCurrentPage();
    document.querySelectorAll(".progress-bar").forEach((bar) => {
        const value = bar.dataset.progress;
        const inner = bar.querySelector(".inner-bar");
        if (value && inner) {
            inner.style.width = "0%";
            inner.classList.add("transition-all", "duration-1000", "ease-out"); 
            setTimeout(() => {
                inner.style.width = `${value}%`;
            }, 300);
        }
    });
});