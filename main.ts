// What the Elevator Would Say — one-line entry for make.fun.
//
// The whole entry is a single sentence spoken in the elevator's own
// voice. This program's only job is to place that sentence into
// entry.txt inside the output directory the grader provides, with no
// trailing newline, so the sealed scorer reads exactly one line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";

const elevatorLine =
  "I have seen things. Mostly your floor, again, because you pressed all of them.";

// Mirror of the sealed scorer's gate: the entry must be 1–120
// characters and must not be only white space. Refuse to write
// anything that would fail the gate.
function gateAccepts(text: string): boolean {
  const length = [...text].length;
  return length >= 1 && length <= 120 && text.trim().length > 0;
}

if (!gateAccepts(elevatorLine)) {
  throw new Error("entry line does not fit the 1-120 character gate");
}

mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, elevatorLine, "utf8");

// Read the file back and confirm it holds exactly the intended line:
// no trailing newline, no encoding surprises.
const written = readFileSync(entryPath, "utf8");
if (written !== elevatorLine) {
  throw new Error("entry.txt does not match the intended line");
}
