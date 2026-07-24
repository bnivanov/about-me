/**
 * Count-up animation for [data-counter] elements.
 * Markup always carries the final value as text content (no-JS / reduced
 * motion fallback); this module parses data-final, resets to zero and
 * animates back to the exact value when the element scrolls into view.
 */

interface ParsedValue {
  prefix: string;
  target: number;
  decimals: number;
  grouped: boolean;
  suffix: string;
}

export function parseFinal(text: string): ParsedValue | null {
  const m = /^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/.exec(text.trim());
  if (!m) return null;
  const numStr = m[2].replace(/,/g, "");
  const target = Number(numStr);
  if (Number.isNaN(target)) return null;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix: m[1], target, decimals, grouped: m[2].includes(","), suffix: m[3] };
}

function format(p: ParsedValue, v: number): string {
  const s = p.grouped
    ? v.toLocaleString("en-GB", {
        minimumFractionDigits: p.decimals,
        maximumFractionDigits: p.decimals,
      })
    : v.toFixed(p.decimals);
  return `${p.prefix}${s}${p.suffix}`;
}

function animate(el: HTMLElement, p: ParsedValue, duration = 1200): void {
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    el.textContent = t < 1 ? format(p, p.target * eased) : format(p, p.target);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function initCounters(): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-counter]"));
  const parsed = new Map<HTMLElement, ParsedValue>();

  for (const el of els) {
    const p = parseFinal(el.dataset.final ?? el.textContent ?? "");
    if (!p) continue;
    parsed.set(el, p);
    el.textContent = format(p, 0);
  }

  if (parsed.size === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        const p = parsed.get(el);
        if (p) animate(el, p);
      }
    },
    { threshold: 0.5 },
  );

  for (const el of parsed.keys()) io.observe(el);
}
