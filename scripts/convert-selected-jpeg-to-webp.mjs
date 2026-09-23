/**
 * Convert specific JPEG assets to WebP (max edge 1920), remove JPEG sources.
 * Run from repo root: node scripts/convert-selected-jpeg-to-webp.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const dirs = [
  path.join(ROOT, "client/public/images/houses/house 9"),
];

async function convertDir(dirAbs) {
  const names = await fs.readdir(dirAbs);
  for (const name of names) {
    if (!/\.jpe?g$/i.test(name)) continue;
    const absIn = path.join(dirAbs, name);
    const absOut = path.join(dirAbs, name.replace(/\.jpe?g$/i, ".webp"));
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
    await fs.unlink(absIn);
    console.log("Removed", path.relative(ROOT, absIn));
  }
}

async function convertFiles(fileAbsList) {
  for (const absIn of fileAbsList) {
    const absOut = absIn.replace(/\.jpe?g$/i, ".webp");
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
    await fs.unlink(absIn);
    console.log("Removed", path.relative(ROOT, absIn));
  }
}

async function main() {
  for (const d of dirs) {
    await convertDir(d);
  }
  const hallHall = [
    path.join(
      ROOT,
      "client/public/images/houses/house 7/house-7-hallway-1.jpg"
    ),
    path.join(
      ROOT,
      "client/public/images/houses/house 7/house-7-hallway-2.jpg"
    ),
  ];
  for (const p of hallHall) {
    try {
      await fs.access(p);
    } catch {
      continue;
    }
    await convertFiles([p]);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
