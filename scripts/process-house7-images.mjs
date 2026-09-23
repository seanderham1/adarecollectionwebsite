#!/usr/bin/env node
/**
 * Process House 7 images: convert to webp, resize landscape to max 1920px, compress to < 200kb
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const HOUSE7_DIR = join(__dirname, '../client/public/images/houses/house 7');
const MAX_WIDTH_LANDSCAPE = 1920;
const MAX_DIMENSION_PORTRAIT = 1920;
const TARGET_MAX_KB = 200;
const TARGET_MAX_BYTES = TARGET_MAX_KB * 1024;

async function processImage(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null;

  const baseName = inputPath.replace(/\.[^.]+$/, '');
  const outputPath = baseName + '.webp';

  const metadata = await sharp(inputPath).metadata();
  const { width, height } = metadata;
  const isLandscape = width >= height;

  // Reduce quality until under 200kb
  const processAtQuality = async (q, resizeW = null) => {
    let p = sharp(inputPath);
    if (resizeW) {
      p = p.resize(resizeW, null);
    } else if (isLandscape && width > MAX_WIDTH_LANDSCAPE) {
      p = p.resize(MAX_WIDTH_LANDSCAPE, null, { withoutEnlargement: true });
    } else if (!isLandscape && Math.max(width, height) > MAX_DIMENSION_PORTRAIT) {
      p = p.resize(null, MAX_DIMENSION_PORTRAIT, { withoutEnlargement: true });
    }
    return p.webp({ quality: q }).toBuffer();
  };

  let buffer = await processAtQuality(60);

  for (let q = 55; buffer.length > TARGET_MAX_BYTES && q >= 30; q -= 5) {
    buffer = await processAtQuality(q);
  }

  // If still over, reduce width for landscape
  if (buffer.length > TARGET_MAX_BYTES && isLandscape) {
    for (const w of [1600, 1400, 1200, 1000]) {
      buffer = await processAtQuality(45, w);
      if (buffer.length <= TARGET_MAX_BYTES) break;
    }
  }

  const finalBuffer = buffer;
  await sharp(finalBuffer).toFile(outputPath);

  const stats = await stat(outputPath);
  const sizeKb = (stats.size / 1024).toFixed(1);
  console.log(`${inputPath.split('/').pop()} -> ${outputPath.split('/').pop()} (${sizeKb}kb, ${isLandscape ? 'landscape' : 'portrait'})`);
  return { outputPath, isLandscape, sizeKb };
}

async function main() {
  const files = await readdir(HOUSE7_DIR);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`Processing ${imageFiles.length} images in House 7...`);

  const results = [];
  for (const file of imageFiles) {
    const inputPath = join(HOUSE7_DIR, file);
    try {
      const result = await processImage(inputPath);
      if (result) results.push({ ...result, file });
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  // Output aspect ratio mapping for the carousel
  console.log('\nAspect ratios (for carousel):');
  const landscape = results.filter(r => r.isLandscape).map(r => r.file.replace(/\.[^.]+$/, '.webp'));
  const portrait = results.filter(r => !r.isLandscape).map(r => r.file.replace(/\.[^.]+$/, '.webp'));
  console.log('Landscape:', landscape);
  console.log('Portrait:', portrait);
}

main().catch(console.error);
