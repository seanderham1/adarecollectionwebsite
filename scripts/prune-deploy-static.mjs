/**
 * Remove large raw video trees from production static output before Firebase deploy.
 * They stay under client/public for local work but should not ship on Hosting/CDN uploads.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "dist", "public");
const dirs = [
  path.join(root, "images/houses/house 13/hillview-videos"),
  path.join(root, "images/houses/house 13/Hillview House 1 Video Assets"),
  path.join(root, "images/houses/house 14/Portland House 2 Video Assets"),
];

for (const p of dirs) {
  if (!fs.existsSync(p)) continue;
  fs.rmSync(p, { recursive: true, force: true });
  console.log("[prune-deploy-static]", "removed:", path.relative(process.cwd(), p));
}
