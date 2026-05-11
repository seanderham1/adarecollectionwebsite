/**
 * Post-`vite build`: clone dist/public/index.html per SEO route, patch <head>,
 * write dist/public/_prerender/*.html, and refresh firebase.json hosting.rewrites.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  getAllPrerenderRouteSEOPayloads,
  prerenderHtmlFilename,
} from "../client/src/lib/prerender-route-meta";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const distIndex = path.join(repoRoot, "dist", "public", "index.html");
const prerenderDir = path.join(repoRoot, "dist", "public", "_prerender");
const firebasePath = path.join(repoRoot, "firebase.json");

/** Safe for double-quoted HTML attributes. */
function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

/** Safe for raw text inside <title>. */
function escapeXmlText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

/** Remove the inline canonical/og:url boot script so crawlers see static head only. */
function stripPathnameCanonicalScript(html: string): string {
  return html.replace(
    /<!-- Per-URL canonical \+ og:url[\s\S]*?<\/script>\s*/,
    "",
  );
}

function injectCanonicalHead(html: string, canonicalUrl: string): string {
  const block = `    <link rel="canonical" href="${escapeHtmlAttr(canonicalUrl)}" />
    <meta property="og:url" content="${escapeHtmlAttr(canonicalUrl)}" />
`;
  return html.replace(
    /(<meta charset="UTF-8" \/>)\s*\n/,
    `$1\n${block}`,
  );
}

function patchHead(html: string, payload: {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
}): string {
  let out = html;
  out = stripPathnameCanonicalScript(out);
  out = injectCanonicalHead(out, payload.canonicalUrl);

  out = out.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeXmlText(payload.title)}</title>`,
  );

  out = out.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtmlAttr(payload.description)}" />`,
  );

  out = out.replace(
    /<meta name="keywords" content="[^"]*" \/>/,
    `<meta name="keywords" content="${escapeHtmlAttr(payload.keywords)}" />`,
  );

  out = out.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtmlAttr(payload.title)}" />`,
  );

  out = out.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtmlAttr(payload.description)}" />`,
  );

  out = out.replace(
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${escapeHtmlAttr(payload.ogImage)}" />`,
  );

  out = out.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeHtmlAttr(payload.title)}" />`,
  );

  out = out.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeHtmlAttr(payload.description)}" />`,
  );

  out = out.replace(
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${escapeHtmlAttr(payload.ogImage)}" />`,
  );

  return out;
}

type FirebaseRewrite =
  | { source: string; function: string; destination?: never }
  | { source: string; destination: string; function?: never };

type FirebaseConfig = {
  hosting: {
    rewrites: FirebaseRewrite[];
    headers?: unknown[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

function patchFirebasePrerenderRewrites(
  routes: { source: string; destination: string }[],
): void {
  const raw = readFileSync(firebasePath, "utf-8");
  const fb = JSON.parse(raw) as FirebaseConfig;
  const rewrites = fb.hosting.rewrites ?? [];
  const apiRule = rewrites.find(
    (r): r is { source: string; function: string } =>
      "function" in r && r.function === "api",
  );
  const spaFallback = rewrites.find(
    (r): r is { source: string; destination: string } =>
      "destination" in r &&
      r.destination === "/index.html" &&
      r.source === "**",
  );

  if (!apiRule) {
    throw new Error("[prerender-pages] firebase.json: missing /api/** function rewrite");
  }
  if (!spaFallback) {
    throw new Error(
      "[prerender-pages] firebase.json: missing ** -> /index.html rewrite",
    );
  }

  const prerenderRules: FirebaseRewrite[] = routes.map((r) => ({
    source: r.source,
    destination: r.destination,
  }));

  fb.hosting.rewrites = [apiRule, ...prerenderRules, spaFallback];
  writeFileSync(firebasePath, `${JSON.stringify(fb, null, 2)}\n`, "utf-8");
}

function main(): void {
  const template = readFileSync(distIndex, "utf-8");
  mkdirSync(prerenderDir, { recursive: true });

  const payloads = getAllPrerenderRouteSEOPayloads();
  const firebaseRoutes: { source: string; destination: string }[] = [];

  for (const p of payloads) {
    const file = prerenderHtmlFilename(p.path);
    const canonicalUrl = p.ogUrl;
    const html = patchHead(template, {
      title: p.title,
      description: p.description,
      keywords: p.keywords,
      ogImage: p.ogImage,
      canonicalUrl,
    });

    writeFileSync(path.join(prerenderDir, file), html, "utf-8");

    // `/` is served as /index.html before Hosting evaluates rewrites, so a
    // rewrite to /_prerender/home.html never wins. Mirror prerender head on
    // the real SPA shell; `**` → /index.html keeps the same document for unknown URLs.
    if (p.path === "/") {
      writeFileSync(distIndex, html, "utf-8");
      continue;
    }

    firebaseRoutes.push({
      source: p.path,
      destination: `/_prerender/${file}`,
    });
  }

  patchFirebasePrerenderRewrites(firebaseRoutes);

  console.log(
    "[prerender-pages]",
    `wrote ${payloads.length} files under _prerender/, patched dist/public/index.html (home), updated firebase.json rewrites`,
  );
}

main();
