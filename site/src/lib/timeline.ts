/**
 * Career timeline accordion. Panels are open by default in CSS so content
 * is fully visible without JS; with JS, panels without [data-open] collapse
 * (animated via grid-template-rows in CSS) and toggles keep aria-expanded
 * in sync.
 */
export function initAccordions(): void {
  const toggles = document.querySelectorAll<HTMLButtonElement>("[data-accordion-toggle]");

  for (const btn of toggles) {
    const panelId = btn.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) continue;

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      if (isOpen) {
        panel.removeAttribute("data-open");
      } else {
        panel.setAttribute("data-open", "");
      }
    });
  }
}
