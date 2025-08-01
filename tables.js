import { highlightCurrentPage } from "./components/scripts/highlight-current.js";
import { fetchSection } from "./components/scripts/include.js";

window.addEventListener("DOMContentLoaded", async () => {
    await fetchSection("sidebar-container", "components/partials/sidebar.html");
    await fetchSection("footer-container", "components/partials/footer.html");
    await fetchSection("breadcrumbs-container", "components/partials/breadcrumbs.html");
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