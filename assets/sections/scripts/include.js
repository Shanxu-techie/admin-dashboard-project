export async function fetchSection(containerId, filePath) {
  try {
    const res = await fetch(filePath);
    const data = await res.text();
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = data;
    } else {
      console.warn(`Element with id "${containerId}" not found.`);
    }
  } catch (err) {
    console.error(`Failed to load ${filePath}:`, err);
  }
}