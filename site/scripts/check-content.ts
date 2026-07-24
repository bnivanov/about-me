/**
 * Content drift gate — asserts every fact in cv-data.json appears verbatim
 * in site/index.html. Run: bun run check:content (from site/).
 * Exits 1 and lists every missing string on failure.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

interface CvData {
  basics: {
    name: string;
    label: string;
    summary: string;
    email: string;
    phone: string;
    location: string;
    profiles: Array<{ network: string; url: string }>;
  };
  expertise: string[];
  work: Array<{
    company: string;
    roles: string[];
    sections: Array<{ name: string; highlights: string[] }>;
  }>;
  education: Array<{ institution: string; degree: string }>;
  additional: { productAndTechnology: string };
  impactMetrics: Array<{ value: string; label: string }>;
}

const data = JSON.parse(readFileSync(join(root, "cv-data.json"), "utf8")) as CvData;
const htmlRaw = readFileSync(join(root, "site", "index.html"), "utf8");

/** Normalise HTML and source text to comparable plain text. */
const norm = (s: string): string =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&(?:thinsp|nbsp);/g, " ")
    .replace(/[()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const html = norm(htmlRaw);

let pass = 0;
const failures: string[] = [];

function check(label: string, needle: string): void {
  if (html.includes(norm(needle))) {
    pass += 1;
  } else {
    failures.push(`${label}: ${needle.slice(0, 80)}${needle.length > 80 ? "…" : ""}`);
  }
}

// Basics
check("name", data.basics.name);
for (const part of data.basics.label.split("|")) check("label", part);
check("summary", data.basics.summary);
check("email", data.basics.email);
check("phone", data.basics.phone);
check("location", data.basics.location);
for (const p of data.basics.profiles) check("profile url", p.url.replace(/^https?:\/\//, ""));

// Expertise
for (const item of data.expertise) check("expertise", item);

// Work history — companies, role titles, section names, every bullet
for (const job of data.work) {
  check("company", job.company);
  for (const role of job.roles) check("role title", role);
  for (const section of job.sections) {
    if (section.name !== "Highlights") check("work section", section.name);
    for (const h of section.highlights) check("highlight", h);
  }
}

// Education — institutions and degree fragments (parens normalised away)
for (const ed of data.education) {
  check("institution", ed.institution);
  for (const frag of ed.degree.split("(").map((f) => f.replace(")", "").trim())) {
    if (frag) check("degree", frag);
  }
}

// Additional
check("product and technology", data.additional.productAndTechnology);
check("languages", "English (fluent), Bulgarian (native)");

// Metrics — values and labels for the counters
for (const m of data.impactMetrics) {
  check("metric value", m.value);
  check("metric label", m.label);
}

// Presentation-formatted date ranges derived from startDate/endDate
check("DT dates", "May 2022 – May 2026");
check("Accenture dates", "Mar 2014 – Apr 2022");

const total = pass + failures.length;
if (failures.length > 0) {
  console.error(`check-content: ${pass}/${total} passed — ${failures.length} MISSING:`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`check-content: ${pass}/${total} checks passed`);
