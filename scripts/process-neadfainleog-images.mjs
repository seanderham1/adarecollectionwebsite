/**
 * Convert Nead Fainleog rasters to WebP, max edge 1920px, then remove sources.
 * Run from repo root: node scripts/process-neadfainleog-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HOUSE_DIR = path.join(ROOT, "client/public/images/houses/neadfainleog");

/** Gallery order: exterior hero → kitchen → living → sitting → utility → bath → bedrooms → exterior tail */
const JOBS = [
  ["exterior/neadfainleog-exterior-1.jpg", "neadfainleog-exterior-1.webp"],
  ["kitchen-dining/neadfainleog-kitchen-dining-1.jpg", "neadfainleog-kitchen-dining-1.webp"],
  ["kitchen-dining/neadfainleog-kitchen-dining-2.jpg", "neadfainleog-kitchen-dining-2.webp"],
  ["livingroom/neadfainleog-livingroom-1.jpg", "neadfainleog-livingroom-1.webp"],
  ["sitting-room/neadfainleog-sittingroom-1.jpg", "neadfainleog-sittingroom-1.webp"],
  ["sitting-room/neadfainleog-sittingroom-2.jpg", "neadfainleog-sittingroom-2.webp"],
  ["utility-room/neadfainleog-utilityroom-1.jpg", "neadfainleog-utilityroom-1.webp"],
  ["downstairs-bathroom/neadfainleog-downstairsbathroom-1.jpg", "neadfainleog-downstairsbathroom-1.webp"],
  ["master-bedroom/neadfainleog-masterbedroom-1.jpg", "neadfainleog-masterbedroom-1.webp"],
  ["master-bedroom/neadfainleog-masterbedroom-2.jpg", "neadfainleog-masterbedroom-2.webp"],
  ["master-bedroom/neadfainleog-masterbedroom-3.jpg", "neadfainleog-masterbedroom-3.webp"],
  ["bedroom-1/neadfainleog-bedroom1-1.jpg", "neadfainleog-bedroom1-1.webp"],
  ["bedroom-1/neadfainleog-bedroom1-2.jpg", "neadfainleog-bedroom1-2.webp"],
  ["bedroom-1/neadfainleog-bedroom1-3.jpg", "neadfainleog-bedroom1-3.webp"],
  ["bedroom-2/neadfainleog-bedroom2-1.jpg", "neadfainleog-bedroom2-1.webp"],
  ["bedroom-2/neadfainleog-bedroom2-2.jpg", "neadfainleog-bedroom2-2.webp"],
  ["bedroom-2/neadfainleog-bedroom2-3.jpg", "neadfainleog-bedroom2-3.webp"],
  ["bedroom-3/neadfainleog-bedroom3-1.jpg", "neadfainleog-bedroom3-1.webp"],
  ["bedroom-3/neadfainleog-bedroom3-2.jpg", "neadfainleog-bedroom3-2.webp"],
  ["exterior/neadfainleog-exterior-2.jpg", "neadfainleog-exterior-2.webp"],
  ["exterior/neadfainleog-exterior-3.jpg", "neadfainleog-exterior-3.webp"],
  ["exterior/neadfainleog-exterior-4.jpg", "neadfainleog-exterior-4.webp"],
  ["exterior/neadfainleog-exterior-5.jpg", "neadfainleog-exterior-5.webp"],
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

async function removeEmptyDirs() {
  const entries = await fs.readdir(HOUSE_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dir = path.join(HOUSE_DIR, entry.name);
    const nested = await fs.readdir(dir);
    if (nested.length === 0) {
      await fs.rmdir(dir);
      console.log("Removed empty folder", entry.name);
    }
  }
}

async function main() {
  for (const [relIn, dest] of JOBS) {
    const absIn = path.join(HOUSE_DIR, relIn);
    await fs.access(absIn);
    await convertOne(absIn, dest);
    await fs.unlink(absIn);
    console.log("Removed", path.relative(ROOT, absIn));
  }
  await removeEmptyDirs();
  console.log("Done. Thumbnail: /images/houses/neadfainleog/neadfainleog-exterior-1.webp");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
