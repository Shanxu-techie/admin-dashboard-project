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