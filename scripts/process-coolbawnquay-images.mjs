/**
 * Download non-wedding gallery images from coolbawnquay.com, convert to WebP
 * (max edge 1920), and re-optimise the existing hero image.
 * Run from repo root: node scripts/process-coolbawnquay-images.mjs
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HOUSE_DIR = path.join(ROOT, "client/public/images/houses/coolbawnquay");
const GALLERY_URL = "https://www.coolbawnquay.com/gallery-page";
const HERO = "coolbawnquay-exterior-1.webp";

const WEDDING_PATTERN =
  /wedding|sinead_mark|katiekav|firstlook|wedding_photographers/i;

/** Map source filename hints to predictable local WebP names (gallery order). */
const OUTPUT_NAMES = [
  "coolbawnquay-cottage-1.webp",
  "coolbawnquay-lakeshore-1.webp",
  "coolbawnquay-cottage-2.webp",
  "coolbawnquay-interior-1.webp",
  "coolbawnquay-interior-2.webp",
  "coolbawnquay-interior-3.webp",
  "coolbawnquay-interior-4.webp",
  "coolbawnquay-landscape-1.webp",
  "coolbawnquay-marina-1.webp",
  "coolbawnquay-exterior-2.webp",
];

async function fetchGalleryUrls() {
  const res = await fetch(GALLERY_URL);
  if (!res.ok) throw new Error(`Gallery fetch failed: ${res.status}`);
  const html = await res.text();
  const matches = html.match(
    /https:\/\/images\.squarespace-cdn\.com\/content\/v1\/593034b66a4963ad00ec39a4\/[^"'\s?]+/g,
  );
  if (!matches) return [];
  const seen = new Set();
  const unique = [];
  for (const url of matches) {
    const clean = url.split("?")[0];
    if (seen.has(clean)) continue;
    seen.add(clean);
    const filename = decodeURIComponent(clean.split("/").pop() ?? "");
    if (WEDDING_PATTERN.test(filename)) continue;
    unique.push(clean);
  }
  return unique.slice(0, OUTPUT_NAMES.length);
}

async function toWebp(absIn, destName) {
  const absOut = path.join(HOUSE_DIR, destName);
  await sharp(absIn)
    .rotate()
    .resize({
      width: 1920,
      height: 1920,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 84, effort: 6 })
    .toFile(absOut);
  const st = await fs.stat(absOut);
  console.log("Wrote", path.relative(ROOT, absOut), `(${(st.size / 1024).toFixed(0)} KB)`);
}

async function reoptimiseHero() {
  const absHero = path.join(HOUSE_DIR, HERO);
  const tmp = path.join(HOUSE_DIR, ".hero-tmp.webp");
  await sharp(absHero)
    .rotate()
    .resize({
      width: 1920,
      height: 1920,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 84, effort: 6 })
    .toFile(tmp);
  await fs.rename(tmp, absHero);
  const st = await fs.stat(absHero);
  console.log("Re-optimised hero", HERO, `(${(st.size / 1024).toFixed(0)} KB)`);
}

async function main() {
  await fs.mkdir(HOUSE_DIR, { recursive: true });

  const urls = await fetchGalleryUrls();
  if (urls.length < OUTPUT_NAMES.length) {
    console.warn(
      `Only ${urls.length} non-wedding gallery URLs found; expected ${OUTPUT_NAMES.length}`,
    );
  }

  for (let i = 0; i < Math.min(urls.length, OUTPUT_NAMES.length); i++) {
    const url = urls[i];
    const dest = OUTPUT_NAMES[i];
    const tmp = path.join(HOUSE_DIR, `.tmp-${i}`);
    console.log(`Downloading [${i + 1}/${OUTPUT_NAMES.length}]`, dest);
    const res = await fetch(url);
    if (!res.ok) {
      console.warn("Skip (download failed):", url);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(tmp, buf);
    await toWebp(tmp, dest);
    await fs.unlink(tmp);
  }

  await reoptimiseHero();
  console.log("Done. Gallery:", OUTPUT_NAMES.length + 1, "images (hero +", OUTPUT_NAMES.length, ")");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
