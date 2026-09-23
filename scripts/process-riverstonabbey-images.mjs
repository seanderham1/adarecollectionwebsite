/**
 * Convert Riverston Abbey rasters to WebP, max edge 1920px, then remove source JPG/PNG.
 * Run from repo root: node scripts/process-riverstonabbey-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HOUSE_DIR = path.join(ROOT, "client/public/images/houses/riverstonabbey");

/** Gallery order: exterior → kitchen → dining → living → bath → bedrooms → exterior tail */
const JOBS = [
  ["riverstonabbey-exterior-1.png", "riverstonabbey-exterior-1.webp"],
  ["riverstonabbey-kitchen-1.png", "riverstonabbey-kitchen-1.webp"],
  ["riverstonabbey-dining-1.png", "riverstonabbey-dining-1.webp"],
  ["riverstonabbey-livingroom-1.jpg", "riverstonabbey-livingroom-1.webp"],
  ["riverstonabbey-livingroom-2.jpg", "riverstonabbey-livingroom-2.webp"],
  ["riverstonabbey-bathroom-1.jpg", "riverstonabbey-bathroom-1.webp"],
  ["riverstonabbey-bedroom-1.png", "riverstonabbey-bedroom-1.webp"],
  ["riverstonabbey-bedroom-2.png", "riverstonabbey-bedroom-2.webp"],
  ["riverstonabbey-bedroom-3.png", "riverstonabbey-bedroom-3.webp"],
  ["riverstonabbey-bedroom-4.png", "riverstonabbey-bedroom-4.webp"],
  ["riverstonabbey-exterior-2.jpg", "riverstonabbey-exterior-2.webp"],
  ["riverstonabbey-exterior-3.jpg", "riverstonabbey-exterior-3.webp"],
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
  const st = await fs.stat(absOut);
  console.log("Wrote", path.relative(ROOT, absOut), `(${(st.size / 1024).toFixed(0)} KB)`);
}

async function main() {
  for (const [src, dest] of JOBS) {
    const absIn = path.join(HOUSE_DIR, src);
    try {
      await fs.access(absIn);
    } catch {
      console.warn("Missing", src);
      continue;
    }
    await convertOne(absIn, dest);
    await fs.unlink(absIn);
    console.log("Removed", path.relative(ROOT, absIn));
  }
  console.log("Done. Thumbnail: /images/houses/riverstonabbey/riverstonabbey-exterior-1.webp");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
