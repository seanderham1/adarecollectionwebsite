/**
 * House 15 (The Manor Lodge): convert JPGs → WebP (max edge 1920), flat output names; remove sources.
 * Run from repo root: node scripts/process-house-15-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HOUSE_DIR = path.join(ROOT, "client/public/images/houses/house 15");

function rel(...segments) {
  return path.join(HOUSE_DIR, ...segments);
}

/** [source relative path, flat output name] — order matches gallery in properties.ts */
const JOBS = [
  ["Exterior/themanorlodge-exterior-1-1.jpg", "house-15-exterior-1.webp"],
  ["Kitchen/themanorlodge-kitchen-1.jpg", "house-15-kitchen-1.webp"],
  ["Kitchen/themanorlodge-kitchen-2.jpg", "house-15-kitchen-2.webp"],
  ["Kitchen/themanorlodge-kitchen-3.jpg", "house-15-kitchen-3.webp"],
  ["Kitchen/themanorlodge-kitchen-4.jpg", "house-15-kitchen-4.webp"],
  ["Kitchen/themanorlodge-kitchen-5.jpg", "house-15-kitchen-5.webp"],
  ["Kitchen/themanorlodge-kitchen-6.jpg", "house-15-kitchen-6.webp"],
  ["Living Room/themanorlodge-livingroom-1.jpg", "house-15-living-1.webp"],
  ["Living Room/themanorlodge-livingroom-2.jpg", "house-15-living-2.webp"],
  ["Living Room/themanorlodge-livingroom-3.jpg", "house-15-living-3.webp"],
  ["Sitting Room/themanorlodge-sittingroom-1.jpg", "house-15-sitting-1.webp"],
  ["Sitting Room/themanorlodge-sittingroom-2.jpg", "house-15-sitting-2.webp"],
  ["Entrance Way/themanorlodge-entranceway1-1.jpg", "house-15-entrance-1.webp"],
  ["Entrance Way/themanorlodge-entranceway1-2.jpg", "house-15-entrance-2.webp"],
  ["Entrance Way/themanorlodge-entranceway1-3.jpg", "house-15-entrance-3.webp"],
  ["Entrance Way/themanorlodge-entranceway1-4.jpg", "house-15-entrance-4.webp"],
  ["Bathroom/themanorlodge-downstairsbathroom-1.jpg", "house-15-bathroom-downstairs-1.webp"],
  ["Bathroom/themanorlodge-upstairsbathroom-1.jpg", "house-15-bathroom-upstairs-1.webp"],
  ["Bedroom/themanorlodge-bedroom1-1.jpg", "house-15-bedroom-1-1.webp"],
  ["Bedroom/themanorlodge-bedroom1-2.jpg", "house-15-bedroom-1-2.webp"],
  ["Bedroom/themanorlodge-bedroom1-3.jpg", "house-15-bedroom-1-3.webp"],
  ["Bedroom/themanorlodge-bedroom1-4.jpg", "house-15-bedroom-1-4.webp"],
  ["Bedroom/themanorlodge-bedroom1-5.jpg", "house-15-bedroom-1-5.webp"],
  ["Bedroom/themanorlodge-bedroom1-6.jpg", "house-15-bedroom-1-6.webp"],
  ["Bedroom/themanorlodge-bedroom1-7.jpg", "house-15-bedroom-1-7.webp"],
  ["Bedroom/themanorlodge-bedroom2-1.jpg", "house-15-bedroom-2-1.webp"],
  ["Bedroom/themanorlodge-bedroom2-2.jpg", "house-15-bedroom-2-2.webp"],
  ["Bedroom/themanorlodge-bedroom3-1.jpg", "house-15-bedroom-3-1.webp"],
  ["Bedroom/themanorlodge-bedroom3-2.jpg", "house-15-bedroom-3-2.webp"],
  ["Bedroom/themanorlodge-bedroom4-1.jpg", "house-15-bedroom-4-1.webp"],
  ["Bedroom/themanorlodge-bedroom4-2.jpg", "house-15-bedroom-4-2.webp"],
  ["Stairs/themanorlodge-stairs-1.jpg", "house-15-stairs-1.webp"],
  ["Stairs/themanorlodge-stairs-2.jpg", "house-15-stairs-2.webp"],
  ["Stairs/themanorlodge-stairs-3.jpg", "house-15-stairs-3.webp"],
  ["Exterior/themanorlodge-exterior-1-2.jpg", "house-15-exterior-2.webp"],
  ["Exterior/themanorlodge-exterior-1-3.jpg", "house-15-exterior-3.webp"],
  ["Exterior/themanorlodge-exterior-1-4.jpg", "house-15-exterior-4.webp"],
  ["Exterior/themanorlodge-exterior-2-1.jpg", "house-15-exterior-5.webp"],
  ["Exterior/themanorlodge-exterior-2-2.jpg", "house-15-exterior-6.webp"],
  ["Exterior/themanorlodge-exterior-2-3.jpg", "house-15-exterior-7.webp"],
  ["Exterior/themanorlodge-exterior-2-4.jpg", "house-15-exterior-8.webp"],
  ["Exterior/themanorlodge-exterior-3-1.jpg", "house-15-exterior-9.webp"],
  ["Exterior/themanorlodge-exterior-3-2.jpg", "house-15-exterior-10.webp"],
  ["Exterior/themanorlodge-exterior-3-3.jpg", "house-15-exterior-11.webp"],
  ["Exterior/themanorlodge-exterior-3-4.jpg", "house-15-exterior-12.webp"],
  ["Exterior/themanorlodge-exterior-3-5.jpg", "house-15-exterior-13.webp"],
  ["Exterior/themanorlodge-exterior-3-6.jpg", "house-15-exterior-14.webp"],
  ["Exterior/themanorlodge-exterior-3-7.jpg", "house-15-exterior-15.webp"],
  ["Exterior/themanorlodge-exterior-3-8.jpg", "house-15-exterior-16.webp"],
  ["Exterior/themanorlodge-exterior-4-1.jpg", "house-15-exterior-17.webp"],
  ["Exterior/themanorlodge-exterior-4-2.jpg", "house-15-exterior-18.webp"],
  ["Exterior/themanorlodge-exterior-4-3.jpg", "house-15-exterior-19.webp"],
  ["Exterior/themanorlodge-exterior-4-4.jpg", "house-15-exterior-20.webp"],
  ["Exterior/themanorlodge-exterior-4-5.jpg", "house-15-exterior-21.webp"],
  ["Exterior/themanorlodge-exterior-4-6.jpg", "house-15-exterior-22.webp"],
  ["Exterior/themanorlodge-exterior-4-7.jpg", "house-15-exterior-23.webp"],
  ["Exterior/themanorlodge-exterior-5-1.jpg", "house-15-exterior-24.webp"],
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
  for (const [src, dest] of JOBS) {
    const absIn = rel(src);
    await fs.access(absIn);
    await writeWebP(absIn, dest);
    await fs.unlink(absIn);
    console.log("Removed", path.relative(ROOT, absIn));
  }

  console.log("Done. Thumb: /images/houses/house 15/house-15-exterior-1.webp");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
