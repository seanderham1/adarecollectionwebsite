#!/usr/bin/env node
/**
 * Post-deploy canonical check.
 *
 * Checks (in order):
 * 1. Raw HTML `<link rel="canonical">` matches the URL (SSR / pre-rendered).
 * 2. HTTP `Link: <url>; rel="canonical"` header (Firebase Hosting via generate-seo-assets).
 * 3. Inline script that patches canonical from `pathname` (SPA shell).
 *
 * `fetch()` does not run JavaScript, so (1) or (2) must pass unless (3) is present.
 *
 * Usage:
 *   node scripts/verify-canonicals.mjs
 *   SEO_BASE_URL=http://localhost:5000 node scripts/verify-canonicals.mjs
 *   SEO_VERIFY_RAW=1 — canonical correct without JS: HTML `<link rel=canonical>`
 *     OR HTTP `Link` header (SPA-only script does not count).
 *   SEO_VERIFY_HTML_TAG_ONLY=1 — only the HTML tag (stricter; often fails on SPA shells).
 */
const base = (
  process.env.SEO_BASE_URL || "https://theadarecollection.com"
).replace(/\/$/, "");

const paths = [
  "/",
  "/properties",
  "/about",
  "/faq",
  "/contact",
  "/property/cragleigh-house",
  "/property/rangeview",
];

const requireRaw =
  process.env.SEO_VERIFY_RAW === "1" || process.env.SEO_VERIFY_RAW === "true";

/** Only `<link rel="canonical">` in HTML (ignore HTTP Link and SPA script). */
const htmlTagOnly =
  process.env.SEO_VERIFY_HTML_TAG_ONLY === "1" ||
  process.env.SEO_VERIFY_HTML_TAG_ONLY === "true";

function extractCanonicalFromHtml(html) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  if (!m) return null;
  const href = m[0].match(/href=["']([^"']+)["']/i);
  return href ? href[1] : null;
}

/** RFC 5988-style Link header: <url>; rel="canonical" */
function extractCanonicalFromLinkHeader(linkHeader) {
  if (!linkHeader) return null;
  const segments = linkHeader.split(",");
  for (const seg of segments) {
    const m = seg.match(/<([^>\s]+)>\s*;\s*rel\s*=\s*["']?canonical["']?/i);
    if (m) return m[1].trim();
  }
  return null;
}

function normUrl(u) {
  if (!u) return "";
  return u.replace(/\/+$/, "");
}

function expectedCanonical(pathname) {
  if (pathname === "/") return `${base}/`;
  return `${base}${pathname}`;
}

function hasRuntimeCanonicalPatch(html) {
  return (
    html.includes("window.location.pathname") &&
    html.includes('link[rel="canonical"]') &&
    html.includes("setAttribute") &&
    html.includes('meta[property="og:url"]') &&
    html.includes("theadarecollection.com")
  );
}

console.log("SEO canonical verification");
console.log("BASE:", base);
if (htmlTagOnly) {
  console.log(
    "Mode: SEO_VERIFY_HTML_TAG_ONLY=1 (<link rel=canonical> in HTML only)\n",
  );
} else if (requireRaw) {
  console.log(
    "Mode: SEO_VERIFY_RAW=1 (HTML canonical tag or HTTP Link; no JS-only fix)\n",
  );
} else {
  console.log("Mode: HTML tag or HTTP Link or SPA inline patch\n");
}
console.log(
  "GSC: URL Inspection → Test live URL → confirm canonical → Request indexing.\n",
);

let failed = false;

for (const p of paths) {
  const url = `${base}${p === "/" ? "" : p}`;
  let html;
  let linkHeader = null;
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; AdareSEO-Verify/1.0)" },
    });
    if (!res.ok) {
      console.log("FAIL", url, `HTTP ${res.status}`);
      failed = true;
      continue;
    }
    html = await res.text();
    linkHeader = res.headers.get("link");
  } catch (e) {
    console.log("FAIL", url, String(e?.message || e));
    failed = true;
    continue;
  }

  const expected = expectedCanonical(p);
  const htmlCanon = extractCanonicalFromHtml(html);
  const headerCanon = extractCanonicalFromLinkHeader(linkHeader);
  const rawMatch = normUrl(htmlCanon) === normUrl(expected);
  const headerMatch = normUrl(headerCanon) === normUrl(expected);
  const spaPatch = hasRuntimeCanonicalPatch(html);

  let pass;
  let reason;
  if (htmlTagOnly) {
    pass = rawMatch;
    reason = rawMatch ? "raw HTML" : "missing";
  } else if (requireRaw) {
    pass = rawMatch || headerMatch;
    if (rawMatch) reason = "raw HTML";
    else if (headerMatch) reason = `HTTP Link (${headerCanon})`;
    else reason = "missing";
  } else {
    pass = rawMatch || headerMatch || spaPatch;
    if (rawMatch) reason = "raw HTML";
    else if (headerMatch) reason = `HTTP Link (${headerCanon})`;
    else if (spaPatch) reason = "SPA inline script";
    else reason = "none";
  }

  if (!pass) {
    console.log("FAIL", url);
    console.log("  expected (norm):", normUrl(expected));
    console.log("  HTML canonical (norm):", normUrl(htmlCanon), "|", htmlCanon);
    console.log("  HTTP Link canonical:", headerCanon);
    console.log("  SPA patch in HTML:", spaPatch);
    failed = true;
  } else {
    console.log("OK  ", url, "→", expected, `(${reason})`);
  }
}

if (failed) {
  console.log(
    "\nFix: deploy Hosting (firebase.json Link headers), or index.html canonical script.",
    "For tag-only checks (usually fails on SPA): SEO_VERIFY_HTML_TAG_ONLY=1",
  );
  process.exit(1);
}

console.log("\nAll canonical checks passed.");
