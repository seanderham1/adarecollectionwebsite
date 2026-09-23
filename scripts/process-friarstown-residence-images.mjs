/**
 * Convert Friarstown Residence rasters to WebP, max edge 1920px, then remove sources.
 * Run from repo root: node scripts/process-friarstown-residence-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HOUSE_DIR = path.join(
  ROOT,
  "client/public/images/houses/friarstown-residence",
);

/** Story order: exterior → kitchen/pantry → dining → sitting → hall → baths → bedrooms → extras → more exterior */
const ORDERED_SOURCES = [
  "friarstown-exterior-1.jpg",
  "friarstown-exterior-2.jpg",
  "friarstown-kitchen-1.jpeg",
  "friarstown-kitchen-2.jpeg",
  "friarstown-pantry-1.jpeg",
  "friarstown-dining-room-1.jpeg",
  "friarstown-sitting-room-1.jpeg",
  "friarstown-sitting-room-2.jpeg",
  "friarstown-hallway-1.jpeg",
  "friarstown-master-bathroom-1.jpeg",
  "friarstown-master-bedroom-1.png",
  "friarstown-bedroom-1-1.png",
  "friarstown-bedroom-1-2.jpeg",
  "friarstown-bedroom-2.png",
  "friarstown-bedroom-3.png",
  "friarstown-gym-1.jpeg",
  "friarstown-utility-1.jpeg",
  "friarstown-exterior-3.jpg",
  "friarstown-exterior-4.jpg",
];

const DEST_BY_SOURCE = {
  "friarstown-exterior-1.jpg": "friarstown-exterior-1.webp",
  "friarstown-exterior-2.jpg": "friarstown-exterior-2.webp",
  "friarstown-kitchen-1.jpeg": "friarstown-kitchen-1.webp",
  "friarstown-kitchen-2.jpeg": "friarstown-kitchen-2.webp",
  "friarstown-pantry-1.jpeg": "friarstown-pantry-1.webp",
  "friarstown-dining-room-1.jpeg": "friarstown-dining-room-1.webp",
  "friarstown-sitting-room-1.jpeg": "friarstown-sitting-room-1.webp",
  "friarstown-sitting-room-2.jpeg": "friarstown-sitting-room-2.webp",
  "friarstown-hallway-1.jpeg": "friarstown-hallway-1.webp",
  "friarstown-master-bathroom-1.jpeg": "friarstown-master-bathroom-1.webp",
  "friarstown-master-bedroom-1.png": "friarstown-master-bedroom-1.webp",
  "friarstown-bedroom-1-1.png": "friarstown-bedroom-1-1.webp",
  "friarstown-bedroom-1-2.jpeg": "friarstown-bedroom-1-2.webp",
  "friarstown-bedroom-2.png": "friarstown-bedroom-2.webp",
  "friarstown-bedroom-3.png": "friarstown-bedroom-3.webp",
  "friarstown-gym-1.jpeg": "friarstown-gym-1.webp",
  "friarstown-utility-1.jpeg": "friarstown-utility-1.webp",
  "friarstown-exterior-3.jpg": "friarstown-exterior-3.webp",
  "friarstown-exterior-4.jpg": "friarstown-exterior-4.webp",
};

async function convertOne(absIn, destNameFile) {
  const absOut = path.join(HOUSE_DIR, destNameFile);
  await sharp(absIn)
    .rotate()
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
  const jobs = [];
  for (const src of ORDERED_SOURCES) {
    const absIn = path.join(HOUSE_DIR, src);
    await fs.access(absIn);
    const dest = DEST_BY_SOURCE[src];
    if (!dest) throw new Error(`No dest for ${src}`);
    jobs.push({ absIn, dest });
  }

  for (const { absIn, dest } of jobs) {
    await convertOne(absIn, dest);
  }

  for (const { absIn } of jobs) {
    await fs.unlink(absIn);
    console.log("Removed", path.relative(ROOT, absIn));
  }

  console.log(
    "Done. Thumbnail: /images/houses/friarstown-residence/friarstown-exterior-2.webp",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
