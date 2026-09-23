/**
 * Convert 15 Barrington Street images (extracted from PDF) to WebP, max edge 1920px.
 * Run from repo root: node scripts/process-barringtonstreet-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const RAW_DIR = path.join(ROOT, "client/public/images/houses/barringtonstreet/_raw");
const OUT_DIR = path.join(ROOT, "client/public/images/houses/barringtonstreet");

/** [raw filename, gallery webp name] */
const JOBS = [
  ["page01-img01-1187x1600.jpeg", "barringtonstreet-exterior-1.webp"],
  ["page04-img01-720x960.jpeg", "barringtonstreet-hallway-1.webp"],
  ["page05-img01-720x960.jpeg", "barringtonstreet-kitchen-1.webp"],
  ["page06-img01-1200x1600.jpeg", "barringtonstreet-dining-living-1.webp"],
  ["page05-img04-720x960.jpeg", "barringtonstreet-winestore-1.webp"],
  ["page03-img01-1200x1600.jpeg", "barringtonstreet-library-1.webp"],
  ["page13-img02-1280x960.jpeg", "barringtonstreet-livingroom-1.webp"],
  ["page07-img01-840x1120.jpeg", "barringtonstreet-bathroom-1.webp"],
  ["page08-img01-720x960.jpeg", "barringtonstreet-shower-1.webp"],
  ["page07-img04-908x1210.jpeg", "barringtonstreet-bathroom-2.webp"],
  ["page09-img04-717x960.png", "barringtonstreet-bedroom-1.webp"],
  ["page10-img01-896x1200.png", "barringtonstreet-hallway-2.webp"],
  ["page12-img01-800x600.jpeg", "barringtonstreet-coachhouse-living-1.webp"],
  ["page11-img02-642x1120.jpeg", "barringtonstreet-garden-1.webp"],
  ["page15-img01-1200x896.png", "barringtonstreet-rooftop-1.webp"],
];

async function convertOne(absIn, destName) {
  const absOut = path.join(OUT_DIR, destName);
  await sharp(absIn)
    .rotate()
    .resize({
      width: 1920,
      height: 1920,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 82, effort: 6 })
    .toFile(absOut);
  console.log("Wrote", path.relative(ROOT, absOut));
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  for (const [src, dest] of JOBS) {
    const absIn = path.join(RAW_DIR, src);
    await convertOne(absIn, dest);
  }
  console.log("Done. Thumbnail: /images/houses/barringtonstreet/barringtonstreet-exterior-1.webp");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
