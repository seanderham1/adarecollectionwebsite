/**
 * House 14 (Portland House): copy/resize existing WebP exteriors to flat folder; convert JPGs → WebP (max edge 1920); remove sources.
 * Run from repo root: node scripts/process-house-14-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HOUSE_DIR = path.join(ROOT, "client/public/images/houses/house 14");
const IMG_ROOT = path.join(HOUSE_DIR, "house-14-images");

function rel(...segments) {
  return path.join(IMG_ROOT, ...segments);
}

/** Already WebP in Exterior/ — re-export through sharp for consistent max dimension. */
const EXTERIOR_WEBP = [
  "Exterior/house-14-exterior-8.webp",
  "Exterior/house-14-exterior-9.webp",
  "Exterior/house-14-exterior-10.webp",
  "Exterior/house-14-exterior-12.webp",
  "Exterior/house-14-exterior-13.webp",
  "Exterior/house-14-exterior-18.webp",
  "Exterior/house-14-exterior-20.webp",
  "Exterior/house-14-exterior-21.webp",
  "Exterior/house-14-exterior-23.webp",
  "Exterior/house-14-exterior-32.webp",
  "Exterior/house-14-exterior-34.webp",
  "Exterior/house-14-exterior-35.webp",
];

/** JPG → flat output names (order = gallery flow after lead exterior in properties.ts). */
const JPG_JOBS = [
  ["Kitchen/House Two Ballylanders-27.jpg", "house-14-kitchen-1.webp"],
  ["Kitchen/House Two Ballylanders-33.jpg", "house-14-kitchen-2.webp"],
  ["Kitchen/House Two Ballylanders-34.jpg", "house-14-kitchen-3.webp"],
  ["Sitting Room/House Two Ballylanders-31.jpg", "house-14-sitting-1.webp"],
  ["Sitting Room/House Two Ballylanders-32.jpg", "house-14-sitting-2.webp"],
  ["Sun Room/House Two Ballylanders-28.jpg", "house-14-sunroom-1.webp"],
  ["Sun Room/House Two Ballylanders-29.jpg", "house-14-sunroom-2.webp"],
  ["Sun Room/House Two Ballylanders-30.jpg", "house-14-sunroom-3.webp"],
  ["Study/House Two Ballylanders-2.jpg", "house-14-study-1.webp"],
  [
    "Back Hall Ground Floor and Bathroom/House Two Ballylanders-2-3.jpg",
    "house-14-hall-1.webp",
  ],
  [
    "Back Hall Ground Floor and Bathroom/House Two Ballylanders-3-2.jpg",
    "house-14-hall-2.webp",
  ],
  [
    "Master Bedroom Ground Floor/House Two Ballylanders-20.jpg",
    "house-14-master-ground-1.webp",
  ],
  [
    "Master Bedroom Ground Floor/House Two Ballylanders-21.jpg",
    "house-14-master-ground-2.webp",
  ],
  [
    "Master Bedroom Ground Floor/House Two Ballylanders-22.jpg",
    "house-14-master-ground-3.webp",
  ],
  [
    "Master Bedroom Ground Floor/House Two Ballylanders-23.jpg",
    "house-14-master-ground-4.webp",
  ],
  [
    "Master Bedroom Ground Floor/House Two Ballylanders-24.jpg",
    "house-14-master-ground-5.webp",
  ],
  [
    "First Floor Bathroom/House Two Ballylanders-18.jpg",
    "house-14-bathroom-first-1.webp",
  ],
  [
    "First Floor Bathroom/House Two Ballylanders-19.jpg",
    "house-14-bathroom-first-2.webp",
  ],
  [
    "Master Bedroom First Floor/House Two Ballylanders-8.jpg",
    "house-14-master-first-1.webp",
  ],
  [
    "Master Bedroom First Floor/House Two Ballylanders-9.jpg",
    "house-14-master-first-2.webp",
  ],
  [
    "Master Bedroom First Floor/House Two Ballylanders-10.jpg",
    "house-14-master-first-3.webp",
  ],
  [
    "Master Bedroom First Floor/House Two Ballylanders-11.jpg",
    "house-14-master-first-4.webp",
  ],
  [
    "Bedroom 2 First Floor/House Two Ballylanders-12.jpg",
    "house-14-bedroom-2-1.webp",
  ],
  [
    "Bedroom 2 First Floor/House Two Ballylanders-13.jpg",
    "house-14-bedroom-2-2.webp",
  ],
  [
    "Bedroom 2 First Floor/House Two Ballylanders-14.jpg",
    "house-14-bedroom-2-3.webp",
  ],
  [
    "Bedroom 2 First Floor/House Two Ballylanders-15.jpg",
    "house-14-bedroom-2-4.webp",
  ],
  [
    "Bedroom 3 First Floor/House Two Ballylanders-16.jpg",
    "house-14-bedroom-3-1.webp",
  ],
  [
    "Bedroom 3 First Floor/House Two Ballylanders-17.jpg",
    "house-14-bedroom-3-2.webp",
  ],
  [
    "Attic Bedrooms and bathroom/House Two Ballylanders-2-2.jpg",
    "house-14-attic-1.webp",
  ],
  [
    "Attic Bedrooms and bathroom/House Two Ballylanders-3.jpg",
    "house-14-attic-2.webp",
  ],
  [
    "Attic Bedrooms and bathroom/House Two Ballylanders-6.jpg",
    "house-14-attic-3.webp",
  ],
  [
    "Attic Bedrooms and bathroom/House Two Ballylanders-7.jpg",
    "house-14-attic-4.webp",
  ],
  ["Bar In Shed/House Two Ballylanders-35.jpg", "house-14-bar-1.webp"],
  ["House Two Ballylanders Exterior.jpg", "house-14-exterior-36.webp"],
];

async function writeWebP(absIn, destFile) {
  const absOut = path.join(HOUSE_DIR, destFile);
  await sharp(absIn)
    .resize({
      width: 1920,
      height: 1920,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 88 })
    .toFile(absOut);
  console.log("Wrote", path.relative(ROOT, absOut));
}

async function main() {
  for (const relPath of EXTERIOR_WEBP) {
    const absIn = rel(relPath);
    await fs.access(absIn);
    const base = path.basename(relPath);
    await writeWebP(absIn, base);
    await fs.unlink(absIn);
    console.log("Removed", path.relative(ROOT, absIn));
  }

  for (const [src, dest] of JPG_JOBS) {
    const absIn = rel(src);
    await fs.access(absIn);
    await writeWebP(absIn, dest);
    await fs.unlink(absIn);
    console.log("Removed", path.relative(ROOT, absIn));
  }

  console.log("Done. Thumb: /images/houses/house 14/house-14-exterior-21.webp");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
