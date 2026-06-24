/**
 * Convert Southview Cullinagh rasters to WebP, max edge 1920px, then remove sources.
 * Run from repo root: node scripts/process-southview-cullinagh-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HOUSE_DIR = path.join(ROOT, "client/public/images/houses/southviewcullinagh");

/** Gallery order: exterior hero → hallway → kitchen → living → sitting → baths → bedrooms → exterior tail */
const JOBS = [
  ["exterior/southview-exterior-1.jpg", "southview-exterior-1.webp"],
  ["hallway/southview-hallway-1.jpg", "southview-hallway-1.webp"],
  ["kitchen-dining/southview-kitchen-dining-1.jpg", "southview-kitchen-dining-1.webp"],
  ["kitchen-dining/southview-kitchen-dining-2.jpg", "southview-kitchen-dining-2.webp"],
  ["living-room/southview-livingroom-1.jpg", "southview-livingroom-1.webp"],
  ["living-room/southview-livingroom-2.jpg", "southview-livingroom-2.webp"],
  ["sitting-room/southview-sittingroom-1.jpg", "southview-sittingroom-1.webp"],
  ["sitting-room/southview-sittingroom-2.jpg", "southview-sittingroom-2.webp"],
  ["main-bathroom/southview-mainbathroom-1.jpg", "southview-mainbathroom-1.webp"],
  ["main-bathroom/southview-mainbathroom-2.jpg", "southview-mainbathroom-2.webp"],
  ["main-bathroom/southview-mainbathroom-3.jpg", "southview-mainbathroom-3.webp"],
  ["master-bedroom/southview-masterbedroom-1.jpg", "southview-masterbedroom-1.webp"],
  ["master-bedroom/southview-masterbedroom-2.jpg", "southview-masterbedroom-2.webp"],
  ["master-bedroom/southview-masterbedroom-3.jpg", "southview-masterbedroom-3.webp"],
  ["bedroom 2/southview-bedroom-2.png", "southview-bedroom-2.webp"],
  ["bedroom 3/southview-bedroom-3.png", "southview-bedroom-3.webp"],
  ["exterior/southview-exterior-2.jpg", "southview-exterior-2.webp"],
];

async function convertOne(absIn, destName) {
  const absOut = path.join(HOUSE_DIR, destName);
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
  for (const [relIn, dest] of JOBS) {
    const absIn = path.join(HOUSE_DIR, relIn);
    await fs.access(absIn);
    await convertOne(absIn, dest);
    await fs.unlink(absIn);
    console.log("Removed", path.relative(ROOT, absIn));
  }
  console.log("Done. Thumbnail: /images/houses/southviewcullinagh/southview-exterior-1.webp");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
