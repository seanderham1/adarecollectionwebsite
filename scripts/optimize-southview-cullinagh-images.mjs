/**
 * Re-optimize Southview Cullinagh gallery WebPs for web delivery.
 * Run from repo root: node scripts/optimize-southview-cullinagh-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HOUSE_DIR = path.join(ROOT, "client/public/images/houses/southviewcullinagh");

async function optimizeOne(file) {
  const absIn = path.join(HOUSE_DIR, file);
  const absTmp = `${absIn}.tmp`;
  const before = (await fs.stat(absIn)).size;

  await sharp(absIn)
    .rotate()
    .resize({
      width: 1920,
      height: 1920,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 82, effort: 6 })
    .toFile(absTmp);

  await fs.rename(absTmp, absIn);
  const after = (await fs.stat(absIn)).size;
  const meta = await sharp(absIn).metadata();
  console.log(
    `${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${meta.width}x${meta.height})`,
  );
}

async function removeRasterSources() {
  const entries = await fs.readdir(HOUSE_DIR, { withFileTypes: true, recursive: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const rel = path.relative(HOUSE_DIR, path.join(entry.parentPath ?? entry.path, entry.name));
    if (/\.(jpe?g|png)$/i.test(rel)) {
      await fs.unlink(path.join(HOUSE_DIR, rel));
      console.log("Removed", rel);
    }
  }
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
  const files = (await fs.readdir(HOUSE_DIR))
    .filter((f) => f.endsWith(".webp"))
    .sort();

  for (const file of files) {
    await optimizeOne(file);
  }

  await removeRasterSources();
  await removeEmptyDirs();

  const total = files.reduce(async (sumP, file) => {
    const sum = await sumP;
    const size = (await fs.stat(path.join(HOUSE_DIR, file))).size;
    return sum + size;
  }, Promise.resolve(0));

  console.log(`Done. ${files.length} WebP files, ${(total / 1024 / 1024).toFixed(2)}MB total.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
