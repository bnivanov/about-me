/**
 * Scroll-in reveal for [data-reveal] elements.
 * Progressive enhancement: elements are visible by default; they are only
 * hidden ("armed") here when the user has no reduced-motion preference.
 */
export function initReveals(): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (els.length === 0) return;

  // Stagger siblings that reveal together (e.g. the metrics grid).
  for (const el of els) {
    el.classList.add("armed");
    const siblings = el.parentElement
      ? Array.from(el.parentElement.querySelectorAll(":scope > [data-reveal]"))
      : [el];
    const i = siblings.indexOf(el);
    if (i > 0) el.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
  );

  for (const el of els) io.observe(el);
}
