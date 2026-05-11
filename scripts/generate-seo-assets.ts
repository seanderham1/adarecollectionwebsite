/**
 * Generates static SEO assets from the single source of truth before `vite build`:
 * - client/public/sitemap.xml
 * - client/public/data/property-index-meta.json (for server-side HTML head injection)
 * - firebase.json hosting headers: HTTP Link rel=canonical per route (Firebase static hosting)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { properties } from "../client/src/lib/properties";
import {
  propertyPageDescription,
  propertyPageTitle,
} from "../client/src/lib/property-seo";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = "https://theadarecollection.com";
const lastmod = new Date().toISOString().slice(0, 10);

function urlBlock(
  loc: string,
  changefreq: string,
  priority: string,
  mod = lastmod,
): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${mod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const staticRoutes: { path: string; changefreq: string; priority: string }[] =
  [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/properties", changefreq: "weekly", priority: "0.9" },
    { path: "/about", changefreq: "monthly", priority: "0.7" },
    { path: "/contact", changefreq: "monthly", priority: "0.8" },
    { path: "/faq", changefreq: "monthly", priority: "0.7" },
  ];

const manifest: Record<string, { title: string; description: string }> = {};

for (const p of properties) {
  manifest[p.id] = {
    title: `${propertyPageTitle(p)} | The Adare Collection`,
    description: propertyPageDescription(p),
  };
}

const propertyBlocks = properties.map((p) =>
  urlBlock(`${SITE}/property/${p.id}`, "weekly", "0.8", lastmod),
);

const staticBlocks = staticRoutes.map((r) =>
  urlBlock(`${SITE}${r.path}`, r.changefreq, r.priority, lastmod),
);

const footerBlocks = [
  urlBlock(`${SITE}/privacy`, "monthly", "0.5", lastmod),
  urlBlock(`${SITE}/terms`, "monthly", "0.5", lastmod),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticBlocks.join("\n")}
${propertyBlocks.join("\n")}
${footerBlocks.join("\n")}
</urlset>
`;

const publicDir = path.resolve(__dirname, "..", "client", "public");
const dataDir = path.join(publicDir, "data");
mkdirSync(dataDir, { recursive: true });

writeFileSync(path.join(publicDir, "sitemap.xml"), xml, "utf-8");
writeFileSync(
  path.join(dataDir, "property-index-meta.json"),
  `${JSON.stringify(manifest, null, 0)}\n`,
  "utf-8",
);

const repoRoot = path.resolve(__dirname, "..");
const firebasePath = path.join(repoRoot, "firebase.json");

type FirebaseConfig = {
  hosting: {
    headers: { source: string; headers: { key: string; value: string }[] }[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

function linkHeaderRule(source: string, absoluteUrl: string) {
  return {
    source,
    headers: [
      {
        key: "Link",
        value: `<${absoluteUrl}>; rel="canonical"`,
      },
    ],
  };
}

function patchFirebaseCanonicalHeaders(): void {
  const raw = readFileSync(firebasePath, "utf-8");
  const fb = JSON.parse(raw) as FirebaseConfig;
  const existing = fb.hosting.headers ?? [];
  const security = existing.find((h) => h.source === "**");
  if (!security) {
    throw new Error(
      "[generate-seo-assets] firebase.json: missing headers block with source **",
    );
  }

  const linkRules: { source: string; headers: { key: string; value: string }[] }[] =
    [];

  linkRules.push(linkHeaderRule("/", `${SITE}/`));

  for (const r of staticRoutes) {
    if (r.path === "/") continue;
    linkRules.push(linkHeaderRule(r.path, `${SITE}${r.path}`));
  }

  for (const p of properties) {
    linkRules.push(
      linkHeaderRule(`/property/${p.id}`, `${SITE}/property/${p.id}`),
    );
  }

  linkRules.push(linkHeaderRule("/privacy", `${SITE}/privacy`));
  linkRules.push(linkHeaderRule("/terms", `${SITE}/terms`));

  fb.hosting.headers = [...linkRules, security];
  writeFileSync(firebasePath, `${JSON.stringify(fb, null, 2)}\n`, "utf-8");
}

patchFirebaseCanonicalHeaders();

console.log(
  "[generate-seo-assets]",
  "sitemap.xml + data/property-index-meta.json + firebase Link headers",
  `(${properties.length} listings)`,
);
