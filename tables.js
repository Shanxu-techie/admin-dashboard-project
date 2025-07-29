import { highlightCurrentPage } from "./assets/sections/scripts/highlight-current.js";
import { fetchSection } from "./assets/sections/scripts/include.js";

window.addEventListener("DOMContentLoaded", async () => {
    await fetchSection("sidebar-container", "assets/sections/partials/sidebar.html");
    await fetchSection("footer-container", "assets/sections/partials/footer.html");
    await fetchSection("breadcrumbs-container", "assets/sections/partials/breadcrumbs.html");
    highlightCurrentPage();
});