/**
 * One-off (and template): convert house 13 rasters to WebP, max edge 1920px, then remove sources.
 * Run from repo root: node scripts/process-house-13-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HOUSE_DIR = path.join(ROOT, "client/public/images/houses/house 13");
const OUT_DIR = HOUSE_DIR;

function rel(...segments) {
  return path.join(HOUSE_DIR, ...segments);
}

/** Order: ground exterior → aerial → kitchen/living → sitting → baths → bedrooms */
const GROUND_EXTERIOR = [
  "Hillview House 1 Photos/Exterior/House One Ballylanders.jpg",
  "Hillview House 1 Photos/Exterior/House One Ballylanders-2-4.jpg",
  "Hillview House 1 Photos/Exterior/House One Ballylanders-4.jpg",
];

const INTERIOR_TAIL = [
  "Hillview House 1 Photos/Downstairs Kitchen Living Room/House One Ballylanders-6.jpg",
  "Hillview House 1 Photos/Downstairs Kitchen Living Room/House One Ballylanders-3-2.jpg",
  "Hillview House 1 Photos/Downstairs Kitchen Living Room/House One Ballylanders-4-2.jpg",
  "Hillview House 1 Photos/Downstairs Kitchen Living Room/House One Ballylanders-5.jpg",
  "Hillview House 1 Photos/Downstairs Sitting Room/House One Ballylanders-2.jpg",
  "Hillview House 1 Photos/Downstairs Sitting Room/House One Ballylanders-2-2.jpg",
  "Hillview House 1 Photos/Downstairs Bathroom/House One Ballylanders-7.jpg",
  "Hillview House 1 Photos/Downstairs Bathroom/House One Ballylanders-8.jpg",
  "Hillview House 1 Photos/Master Bedroom/House One Ballylanders.jpg",
  "Hillview House 1 Photos/Master Bedroom/House One Ballylanders-2.jpg",
  "Hillview House 1 Photos/Master Bedroom/House One Ballylanders-3.jpg",
  "Hillview House 1 Photos/Bedroom 2/House One Ballylanders.jpg",
  "Hillview House 1 Photos/Bedroom 2/House One Ballylanders-2.jpg",
  "Hillview House 1 Photos/Bedroom 3/House One Ballylanders-3.jpg",
  "Hillview House 1 Photos/Bedroom 4/House One Ballylanders.jpg",
  "Hillview House 1 Photos/Bedroom 4/House One Ballylanders-2.jpg",
  "Hillview House 1 Photos/Attic Bedrroms/House One Ballylanders.jpg",
  "Hillview House 1 Photos/Attic Bedrroms/House One Ballylanders-2.jpg",
  "Hillview House 1 Photos/Attic Bedrroms/House One Ballylanders-3.jpg",
];

async function listAerials() {
  const dir = rel("hillview-images");
  const names = await fs.readdir(dir);
  return names
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => path.join("hillview-images", f));
}

const c = {
  exterior: 0,
  aerial: 0,
  kitchen: 0,
  sitting: 0,
  bathroom: 0,
  master: 0,
  bed2: 0,
  bed3: 0,
  bed4: 0,
  attic: 0,
};

function destName(relPath) {
  const lower = relPath.replace(/\\/g, "/").toLowerCase();
  if (lower.includes("hillview-images")) {
    c.aerial += 1;
    return `house-13-exterior-${3 + c.aerial}.webp`;
  }
  if (lower.includes("/exterior/")) {
    c.exterior += 1;
    return `house-13-exterior-${c.exterior}.webp`;
  }
  if (lower.includes("kitchen living")) {
    c.kitchen += 1;
    return `house-13-kitchen-${c.kitchen}.webp`;
  }
  if (lower.includes("sitting room")) {
    c.sitting += 1;
    return `house-13-sitting-${c.sitting}.webp`;
  }
  if (lower.includes("bathroom")) {
    c.bathroom += 1;
    return `house-13-bathroom-${c.bathroom}.webp`;
  }
  if (lower.includes("master bedroom")) {
    c.master += 1;
    return `house-13-master-${c.master}.webp`;
  }
  if (lower.includes("bedroom 2")) {
    c.bed2 += 1;
    return `house-13-bedroom-2-${c.bed2}.webp`;
  }
  if (lower.includes("bedroom 3")) {
    c.bed3 += 1;
    return `house-13-bedroom-3-${c.bed3}.webp`;
  }
  if (lower.includes("bedroom 4")) {
    c.bed4 += 1;
    return `house-13-bedroom-4-${c.bed4}.webp`;
  }
  if (lower.includes("attic")) {
    c.attic += 1;
    return `house-13-attic-${c.attic}.webp`;
  }
  throw new Error(`Cannot categorize: ${relPath}`);
}

async function convertOne(absIn, destNameFile) {
  const absOut = path.join(OUT_DIR, destNameFile);
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
  const aerials = await listAerials();
  const allRelative = [...GROUND_EXTERIOR, ...aerials, ...INTERIOR_TAIL];

  const jobs = [];
  for (const relPath of allRelative) {
    const absIn = rel(relPath);
    await fs.access(absIn);
    jobs.push({ absIn, dest: destName(relPath), relPath });
  }

  for (const { absIn, dest } of jobs) {
    await convertOne(absIn, dest);
  }

  for (const { absIn } of jobs) {
    await fs.unlink(absIn);
    console.log("Removed", path.relative(ROOT, absIn));
  }

  console.log("Done. Thumbnail: /images/houses/house 13/house-13-exterior-1.webp");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
