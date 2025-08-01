export function highlightCurrentPage() {
    const currentPage = document.body.getAttribute("data-page");
    const sidebarLinks = document.querySelectorAll("a[data-page]");
    sidebarLinks.forEach(link => {
        const iconBox = link.querySelector(".icon-wrapper");
        const icon = link.querySelector(".icon");

        if (link.getAttribute("data-page") === currentPage) {
            iconBox.classList.remove("bg-[#1A1F37]");
            iconBox.classList.add("bg-[#0075FF]");
            icon.classList.add("text-white");
            icon.classList.remove("text-[#0075FF]");
            link.closest("li").classList.add("bg-[#1A1F37]");
        } else {
            iconBox.classList.add("bg-[#1A1F37]");
            iconBox.classList.remove("bg-[#0075FF]");
            icon.classList.remove("text-white");
            icon.classList.add("text-[#0075FF]");
            link.closest("li").classList.remove("bg-[#1A1F37]");
        }
    });
}
