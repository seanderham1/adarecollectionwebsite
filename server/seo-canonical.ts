/** Production site origin — must match public URLs and sitemap. */
export const SITE_ORIGIN = "https://theadarecollection.com";

/**
 * Normalise request path and return absolute canonical URL (always the URL of the
 * document being served). Required for SPA fallbacks so sub-routes are not all
 * consolidated under the homepage canonical in the static HTML shell.
 */
export function canonicalUrlForRequestPath(rawPathOrUrl: string): string {
  let pathname = rawPathOrUrl.split("?")[0] ?? "/";
  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  if (pathname === "/") {
    return `${SITE_ORIGIN}/`;
  }
  return `${SITE_ORIGIN}${pathname}`;
}

/** Set or insert canonical link + og:url so HTML never contradicts per-route Firebase Link headers. */
export function injectPrimarySeoUrls(html: string, rawPathOrUrl: string): string {
  const canonical = canonicalUrlForRequestPath(rawPathOrUrl);
  const linkTag = `<link rel="canonical" href="${canonical}" />`;
  const ogUrlTag = `<meta property="og:url" content="${canonical}" />`;

  let out = html;
  if (/<link[^>]+rel=["']canonical["'][^>]*>/i.test(out)) {
    out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, linkTag);
  } else {
    out = out.replace(/<head(\s[^>]*)?>/i, (m) => `${m}\n    ${linkTag}`);
  }
  if (/<meta\s[^>]*property=["']og:url["'][^>]*>/i.test(out)) {
    out = out.replace(
      /<meta\s[^>]*property=["']og:url["'][^>]*>/i,
      ogUrlTag,
    );
  } else {
    const withOg = out.replace(
      /(<link[^>]+rel=["']canonical["'][^>]*\/?>)/i,
      `$1\n    ${ogUrlTag}`,
    );
    out =
      withOg === out
        ? out.replace("</head>", `    ${ogUrlTag}\n  </head>`)
        : withOg;
  }
  return out;
}
