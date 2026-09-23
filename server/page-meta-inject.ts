import fs from "fs";
import path from "path";

/**
 * HTML-first title/description for `/property/*` when served by Node (express).
 * Firebase Hosting serves a single index.html for all routes: crawlers still rely on
 * client-side SEO + inline canonical script; full prerender per URL would need
 * Cloud Functions, extra static HTML, or a framework with SSR.
 */
type Manifest = Record<string, { title: string; description: string }>;

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function readManifest(baseDir: string): Manifest {
  const f = path.join(baseDir, "data", "property-index-meta.json");
  if (!fs.existsSync(f)) return {};
  try {
    return JSON.parse(fs.readFileSync(f, "utf-8")) as Manifest;
  } catch {
    return {};
  }
}

/**
 * For `/property/{slug}` responses, replace shell title and meta tags using the
 * build-generated manifest so crawlers see page-specific HTML before React
 * (Node hosting only; Firebase static still relies on client hydration).
 */
export function injectPropertyPageHead(
  html: string,
  requestPath: string,
  staticBaseDir: string,
): string {
  const m = requestPath.replace(/\/$/, "").match(/^\/property\/([^/]+)$/);
  if (!m) return html;
  const manifest = readManifest(staticBaseDir);
  const meta = manifest[m[1]];
  if (!meta) return html;

  const t = escapeAttr(meta.title);
  const d = escapeAttr(meta.description);

  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${d}" />`,
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${t}" />`,
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${d}" />`,
  );
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${t}" />`,
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${d}" />`,
  );

  return out;
}
