import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature interaction: the £12m+ turnaround scroll story.
 * On wide viewports without a reduced-motion preference, the case-study
 * stage pins and the adoption curve draws with scroll (scrub), activating
 * the four narrative beats in sequence. Everywhere else the chart renders
 * fully drawn and all beats are visible — the static reading is the
 * fallback, not a degraded error state.
 */
export function initCaseStudy(): void {
  const stage = document.querySelector<HTMLElement>("[data-case-study]");
  if (!stage) return;

  const svg = stage.querySelector<SVGSVGElement>(".case-chart");
  const curve = stage.querySelector<SVGPathElement>("[data-case-curve]");
  const area = stage.querySelector<SVGPathElement>("[data-case-area]");
  const beatsList = stage.querySelector<HTMLElement>(".case-beats");
  const beats = Array.from(stage.querySelectorAll<HTMLElement>("[data-beat]"));
  const dots = Array.from(stage.querySelectorAll<SVGCircleElement>("[data-beat-dot]"));
  if (!svg || !curve || !area || !beatsList || beats.length === 0) return;

  const mm = gsap.matchMedia();

  mm.add("(min-width: 56rem) and (prefers-reduced-motion: no-preference)", () => {
    const length = curve.getTotalLength();
    gsap.set(curve, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(area, { opacity: 0 });
    svg.classList.add("staged");
    beatsList.classList.add("beats-staged");

    const setActive = (active: number) => {
      beats.forEach((b, i) => b.classList.toggle("is-active", i === active));
      dots.forEach((d, i) => d.classList.toggle("is-active", i <= active));
    };
    setActive(0);

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: stage,
        start: "top 15%",
        end: "+=1600",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const active = Math.min(beats.length - 1, Math.floor(self.progress * beats.length));
          setActive(active);
        },
      },
    });

    tl.to(curve, { strokeDashoffset: 0, duration: 1 }, 0);
    tl.to(area, { opacity: 0.07, duration: 0.25 }, 0.75);

    // gsap reverts inline styles automatically; classes are ours to clean up.
    return () => {
      svg.classList.remove("staged");
      beatsList.classList.remove("beats-staged");
      for (const b of beats) b.classList.remove("is-active");
      for (const d of dots) d.classList.remove("is-active");
    };
  });
}
