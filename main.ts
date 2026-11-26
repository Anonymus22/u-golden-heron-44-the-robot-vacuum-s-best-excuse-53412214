// vacuum2 — "The Robot Vacuum's Best Excuse"
// Writes one original one-line excuse from a robot vacuum for missing a spot
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The gate requires 1–140 characters total, including any trailing newline,
// so the excuse itself is kept at most 135 characters.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "My map says the spot is clean. My bumper disagrees. I trust the map — it has never once bumped into a wall.";

if (EXCUSE.length > 135) {
  throw new Error(`Excuse is ${EXCUSE.length} characters, over the 135 limit`);
}
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  throw new Error("Excuse must be a single line");
}
if (EXCUSE.trim().length === 0) {
  throw new Error("Excuse must not be blank");
}
if (EXCUSE !== EXCUSE.trim()) {
  throw new Error("Excuse must not start or end with whitespace");
}
if (!EXCUSE.includes("I ")) {
  throw new Error("Excuse must be in the vacuum's own first-person voice");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, EXCUSE + "\n", "utf8");

// Self-check: the file including its trailing newline must be <= 140 chars.
const written = EXCUSE + "\n";
if (written.length > 140) {
  throw new Error(`Output is ${written.length} characters, over the 140 limit`);
}
if (written.split("\n").length !== 2 || !written.endsWith("\n")) {
  throw new Error("Output must be exactly one line plus a trailing newline");
}
if (readFileSync(outPath, "utf8") !== written) {
  throw new Error("Written file does not match the expected excuse");
}

console.log(`Wrote ${outPath} (${written.length} chars including newline)`);
