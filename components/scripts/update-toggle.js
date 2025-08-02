export function updateToggleState(toggle) {
    const switchBg = toggle.closest("label").querySelector(".switch-bg");
    const switchCircle = toggle.closest("label").querySelector(".switch-circle");
    if (toggle.checked) {
        switchBg.classList.add("bg-[#0075FF]");
        switchBg.classList.remove("bg-[#1B1F3D]");
        switchCircle.style.transform = "translateX(18px)";
    } else {
        switchBg.classList.add("bg-[#1B1F3D]");
        switchBg.classList.remove("bg-[#0075FF]");
        switchCircle.style.transform = "translateX(0)";
    }
}

export function updateSidebarToggle(toggleBtn, toggleBtnInner, sidebar, overlay) {

    const isOpen = sidebar.classList.toggle('-translate-x-full') === false;
    sidebar.classList.toggle('translate-x-0');
    overlay.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
    if (isOpen) {
        toggleBtn.classList.add('hidden');
        toggleBtnInner.classList.remove('hidden');
    } else {
        toggleBtn.classList.remove('hidden');
        toggleBtnInner.classList.add('hidden');
    }

}