import { updateSidebarToggle } from "./update-toggle.js";
import { highlightCurrentPage } from "./highlight-current.js";

export function initSidebar() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const toggleBtnInner = document.getElementById('mobile-menu-toggle-inner');
    const sidebar = document.getElementById('sidebar-wrapper');
    const overlay = document.getElementById('sidebar-overlay');

    toggleBtn.addEventListener('click', () => {
        updateSidebarToggle(toggleBtn, toggleBtnInner, sidebar, overlay);
    });

    toggleBtnInner.addEventListener('click', () => {
        updateSidebarToggle(toggleBtn, toggleBtnInner, sidebar, overlay);
    });

    overlay.addEventListener('click', () => {
        updateSidebarToggle(toggleBtn, toggleBtnInner, sidebar, overlay);
    });

    overlay.addEventListener('touchend', () => {
        updateSidebarToggle(toggleBtn, toggleBtnInner, sidebar, overlay);
    });

    highlightCurrentPage();
}