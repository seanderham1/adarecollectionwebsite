/**
 * Convert Casabel rasters to WebP, max edge 1920px, then remove JPG sources.
 * Run from repo root: node scripts/process-casabel-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HOUSE_DIR = path.join(ROOT, "client/public/images/houses/casabel");

/** Gallery order: exterior hero → kitchen/living/dining → bar/gym → hallways → bedrooms → bathrooms → exterior tail */
const JOBS = [
  ["casabel-exterior-1.jpg", "casabel-exterior-1.webp"],
  ["casabel-kitchen-1.jpg", "casabel-kitchen-1.webp"],
  ["casabel-livingroom-1.jpg", "casabel-livingroom-1.webp"],
  ["casabel-livingroom-2.jpg", "casabel-livingroom-2.webp"],
  ["casabel-diningroom-1.jpg", "casabel-diningroom-1.webp"],
  ["casabel-bar-1.jpg", "casabel-bar-1.webp"],
  ["casabel-gym-1.jpg", "casabel-gym-1.webp"],
  ["casabel-hallway-1.jpg", "casabel-hallway-1.webp"],
  ["casabel-hallway-2.jpg", "casabel-hallway-2.webp"],
  ["casabel-bedroom-1.jpg", "casabel-bedroom-1.webp"],
  ["casabel-bedroom-2.jpg", "casabel-bedroom-2.webp"],
  ["casabel-bedroom-3.jpg", "casabel-bedroom-3.webp"],
  ["casabel-bathroom-1.jpg", "casabel-bathroom-1.webp"],
  ["casabel-bathroom-2.jpg", "casabel-bathroom-2.webp"],
  ["casabel-exterior-2.jpg", "casabel-exterior-2.webp"],
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
  console.log("Done. Thumbnail: /images/houses/casabel/casabel-exterior-1.webp");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
