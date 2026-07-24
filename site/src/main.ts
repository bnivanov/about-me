import "./styles/base.css";
import "./styles/sections.css";

import { initReveals } from "./lib/reveal";
import { initCounters } from "./lib/counters";
import { initAccordions } from "./lib/timeline";
import { initCaseStudy } from "./lib/caseStudy";

document.documentElement.classList.add("js");

initReveals();
initCounters();
initAccordions();
initCaseStudy();
initHeader();
initScrollspy();

/** Hairline under the fixed header once the page is scrolled. */
function initHeader(): void {
  const header = document.querySelector<HTMLElement>("[data-header]");
  if (!header) return;
  const onScroll = () => header.toggleAttribute("data-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/** Marks the nav link for the section currently in view. */
function initScrollspy(): void {
  if (!("IntersectionObserver" in window)) return;
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
  if (links.length === 0) return;

  const bySection = new Map<string, HTMLAnchorElement>();
  for (const link of links) {
    const id = link.dataset.nav;
    if (id) bySection.set(id, link);
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) link.removeAttribute("aria-current");
        bySection.get(entry.target.id)?.setAttribute("aria-current", "true");
      }
    },
    { rootMargin: "-30% 0px -60% 0px" },
  );

  for (const id of bySection.keys()) {
    const section = document.getElementById(id);
    if (section) io.observe(section);
  }
}
