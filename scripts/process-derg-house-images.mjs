/**
 * Convert Derg House rasters to WebP, max edge 1920px, then remove sources.
 * Run from repo root: node scripts/process-derg-house-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HOUSE_DIR = path.join(ROOT, "client/public/images/houses/derghouse");

/** Gallery order: entrance/hall → living → kitchen → sitting → sun room → bath → master → bedrooms → office */
const ORDER = [
  "stairway-hall-1.jpg",
  "stairway-hall-2.jpg",
  "living-room-1.jpg",
  "living-room-2.jpg",
  "living-room-3.jpg",
  "kitchen-1.jpg",
  "sitting-room-1.jpg",
  "siiting-room-2.jpg",
  "sitting-room-3.jpg",
  "sun-room-1.jpg",
  "sun-room-2.jpg",
  "downstairs-bathroom-1.jpg",
  "master-bedroom-1.jpg",
  "master-bedroom-2.jpg",
  "master-bedroom-3.jpg",
  "master-bedroom-4.jpg",
  "master-bedroom-5.jpg",
  "master-bedroom-6.jpg",
  "bedroom2-1.jpg",
  "bedroom2-2.jpg",
  "bedroom2-3.jpg",
  "bedroom2-4.jpg",
  "bedroom3-1.jpg",
  "bedroom3-2.jpg",
  "office-1.jpg",
  "office-2.jpg",
];

function destName(srcName) {
  return srcName.replace(/\.jpe?g$/i, ".webp");
}

async function convertOne(absIn, destNameFile) {
  const absOut = path.join(HOUSE_DIR, destNameFile);
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
  for (const src of ORDER) {
    const absIn = path.join(HOUSE_DIR, src);
    await fs.access(absIn);
    await convertOne(absIn, destName(src));
    await fs.unlink(absIn);
    console.log("Removed", path.relative(ROOT, absIn));
  }

  console.log("Done. Thumbnail: /images/houses/derghouse/stairway-hall-1.webp");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
