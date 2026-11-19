// SPDX-License-Identifier: MIT
// gta6-meme-x-01 — entry program for make.fun's "Post a GTA 6 meme on X" bounty.
// All it does is copy POST.json (the X post's address) from this repository
// into the output directory, where the house reads it.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

// Validate POST.json before copying: it must be a JSON object with a
// string "url" naming the X post, so a broken placeholder fails loudly
// here instead of silently reaching the gate.
const postPath = join(botDir, "POST.json");
const post = JSON.parse(readFileSync(postPath, "utf8")) as unknown;
if (typeof post !== "object" || post === null || typeof (post as { url?: unknown }).url !== "string") {
  throw new Error("POST.json must be a JSON object with a string \"url\" field");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(postPath, join(outDir, "POST.json"));
