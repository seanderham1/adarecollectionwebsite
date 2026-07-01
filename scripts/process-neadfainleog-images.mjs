/**
 * Convert Nead Fainleog rasters to WebP, max edge 1920px, then remove JPG sources.
 * Run from repo root: node scripts/process-neadfainleog-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HOUSE_DIR = path.join(ROOT, "client/public/images/houses/neadfainleog");

/** Gallery order: exterior hero → kitchen/dining → living → sitting → bath → stairs → bedrooms → exterior tail */
const JOBS = [
  ["neadfainleog-exterior-1.jpg", "neadfainleog-exterior-1.webp"],
  ["neadfainleog-kitchen-dining-1.jpg", "neadfainleog-kitchen-dining-1.webp"],
  ["neadfainleog-kitchen-dining-2.jpg", "neadfainleog-kitchen-dining-2.webp"],
  ["neadfainleog-diningroom-1.jpg", "neadfainleog-diningroom-1.webp"],
  ["neadfainleog-livingroom-1.jpg", "neadfainleog-livingroom-1.webp"],
  ["neadfainleog-sittingroom-1.jpg", "neadfainleog-sittingroom-1.webp"],
  ["neadfainleog-bathroom-1.jpg", "neadfainleog-bathroom-1.webp"],
  ["neadfainleog-stairs-1.jpg", "neadfainleog-stairs-1.webp"],
  ["neadfainleog-masterbedroom-1.jpg", "neadfainleog-masterbedroom-1.webp"],
  ["neadfainleog-bedroom1-1.jpg", "neadfainleog-bedroom1-1.webp"],
  ["neadfainleog-bedroom2-1.jpg", "neadfainleog-bedroom2-1.webp"],
  ["neadfainleog-bedroom3-1.jpg", "neadfainleog-bedroom3-1.webp"],
  ["neadfainleog-exterior-2.jpg", "neadfainleog-exterior-2.webp"],
  ["neadfainleog-exterior-3.jpg", "neadfainleog-exterior-3.webp"],
  ["neadfainleog-exterior-4.jpg", "neadfainleog-exterior-4.webp"],
  ["neadfainleog-exterior-5.jpg", "neadfainleog-exterior-5.webp"],
  ["neadfainleog-exterior-7.png", "neadfainleog-exterior-7.webp"],
];

async function convertOne(absIn, destName) {
  const absOut = path.join(HOUSE_DIR, destName);
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
  for (const [src, dest] of JOBS) {
    const absIn = path.join(HOUSE_DIR, src);
    try {
      await fs.access(absIn);
    } catch {
      continue;
    }
    await convertOne(absIn, dest);
    await fs.unlink(absIn);
    console.log("Removed", path.relative(ROOT, absIn));
  }
  console.log("Done. Thumbnail: /images/houses/neadfainleog/neadfainleog-exterior-1.webp");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
