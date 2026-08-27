// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
async function registerRoutes(app2) {
  app2.post("/api/newsletter-subscription", async (req, res) => {
    try {
      const { email, timestamp, source } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Invalid email address" });
      }
      console.log("Newsletter subscription received:", {
        email,
        timestamp,
        source,
        adminEmail: "info@theadarecollection.ie"
      });
      res.status(200).json({
        success: true,
        message: "Newsletter subscription processed successfully"
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// client/src/lib/seo-global-graph.ts
var GLOBAL_SCHEMA_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://theadarecollection.com/#organization",
      name: "The Adare Collection",
      legalName: "The Adare Collection Limited",
      url: "https://theadarecollection.com",
      description: "Exclusive private houses and estates near Adare Manor. Corporate and executive rentals and luxury homes in County Limerick. Independent accommodation provider \u2014 not affiliated with the Ryder Cup.",
      logo: {
        "@type": "ImageObject",
        url: "https://theadarecollection.com/images/navbar/adarecollectionlogo.png"
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Adare",
        addressRegion: "Limerick",
        addressCountry: "IE"
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+353-86-668-1930",
        contactType: "customer service",
        email: "info@theadarecollection.ie"
      },
      sameAs: [
        "https://www.linkedin.com/company/the-adare-collection",
        "https://www.instagram.com/theadarecollection/"
      ],
      foundingDate: "2026-04-08",
      areaServed: {
        "@type": "Country",
        name: "Ireland"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://theadarecollection.com/#website",
      url: "https://theadarecollection.com",
      name: "The Adare Collection",
      alternateName: ["The Adare Collection Ltd", "Adare Collection"],
      description: "Ryder Cup 2027 accommodation at Adare Manor. Luxury rentals, private residences, and estates.",
      inLanguage: "en-IE",
      publisher: { "@id": "https://theadarecollection.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://theadarecollection.com/properties?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "ItemList",
      "@id": "https://theadarecollection.com/#primary-navigation",
      name: "Main pages",
      numberOfItems: 9,
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Home",
          url: "https://theadarecollection.com/"
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "Luxury properties",
          url: "https://theadarecollection.com/properties"
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Estate services",
          url: "https://theadarecollection.com/services"
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "About",
          url: "https://theadarecollection.com/about"
        },
        {
          "@type": "SiteNavigationElement",
          position: 5,
          name: "FAQ",
          url: "https://theadarecollection.com/faq"
        },
        {
          "@type": "SiteNavigationElement",
          position: 6,
          name: "Blog",
          url: "https://theadarecollection.com/blog"
        },
        {
          "@type": "SiteNavigationElement",
          position: 7,
          name: "Contact",
          url: "https://theadarecollection.com/contact"
        }
      ]
    },
    {
      "@type": "RealEstateAgent",
      "@id": "https://theadarecollection.com/#realEstateAgent",
      name: "The Adare Collection",
      legalName: "The Adare Collection Limited",
      parentOrganization: { "@id": "https://theadarecollection.com/#organization" },
      description: "Ryder Cup 2027 accommodation at Adare Manor. Luxury rentals, private residences.",
      url: "https://theadarecollection.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Adare",
        addressRegion: "Limerick",
        addressCountry: "IE"
      },
      areaServed: "Adare Manor Estate",
      serviceType: "Luxury Accommodation Rental",
      event: {
        "@type": "SportsEvent",
        name: "Ryder Cup 2027",
        description: "The 2027 Ryder Cup golf tournament at Adare Manor, featuring the best golfers from Europe and the United States.",
        startDate: "2027-09-29",
        endDate: "2027-10-01",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: "Adare Manor Golf Course",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Adare Manor",
            addressLocality: "Adare",
            addressRegion: "Limerick",
            addressCountry: "IE",
            postalCode: "V94 W8WR"
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 52.5644,
            longitude: -8.7892
          }
        },
        organizer: {
          "@type": "Organization",
          name: "Ryder Cup Europe",
          url: "https://www.rydercup.com"
        },
        performer: [
          { "@type": "SportsTeam", name: "European Ryder Cup Team" },
          { "@type": "SportsTeam", name: "United States Ryder Cup Team" }
        ],
        image: "https://theadarecollection.com/images/hero/adaremanor-img2.webp"
      }
    }
  ]
};

// vite.config.ts
var __dirname = path.dirname(fileURLToPath(import.meta.url));
function injectGlobalSchemaLdJson() {
  const tag = `<!--INJECT_GLOBAL_SCHEMA_LD_JSON-->`;
  return {
    name: "inject-global-schema-ld-json",
    transformIndexHtml(html) {
      if (!html.includes(tag)) return html;
      const json = JSON.stringify(GLOBAL_SCHEMA_GRAPH);
      return html.replace(
        tag,
        `<script type="application/ld+json">${json}</script>`
      );
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [
    react(),
    injectGlobalSchemaLdJson(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@radix-ui/react-select", "@radix-ui/react-dialog", "@radix-ui/react-toast"]
        }
      }
    },
    minify: "esbuild"
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";

// server/seo-canonical.ts
var SITE_ORIGIN = "https://theadarecollection.com";
function canonicalUrlForRequestPath(rawPathOrUrl) {
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
function injectPrimarySeoUrls(html, rawPathOrUrl) {
  const canonical = canonicalUrlForRequestPath(rawPathOrUrl);
  const linkTag = `<link rel="canonical" href="${canonical}" />`;
  const ogUrlTag = `<meta property="og:url" content="${canonical}" />`;
  let out = html;
  if (/<link[^>]+rel=["']canonical["'][^>]*>/i.test(out)) {
    out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, linkTag);
  } else {
    out = out.replace(/<head(\s[^>]*)?>/i, (m) => `${m}
    ${linkTag}`);
  }
  if (/<meta\s[^>]*property=["']og:url["'][^>]*>/i.test(out)) {
    out = out.replace(
      /<meta\s[^>]*property=["']og:url["'][^>]*>/i,
      ogUrlTag
    );
  } else {
    const withOg = out.replace(
      /(<link[^>]+rel=["']canonical["'][^>]*\/?>)/i,
      `$1
    ${ogUrlTag}`
    );
    out = withOg === out ? out.replace("</head>", `    ${ogUrlTag}
  </head>`) : withOg;
  }
  return out;
}

// server/page-meta-inject.ts
import fs from "fs";
import path2 from "path";
function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function readManifest(baseDir) {
  const f = path2.join(baseDir, "data", "property-index-meta.json");
  if (!fs.existsSync(f)) return {};
  try {
    return JSON.parse(fs.readFileSync(f, "utf-8"));
  } catch {
    return {};
  }
}
function injectPropertyPageHead(html, requestPath, staticBaseDir) {
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
    `<meta name="description" content="${d}" />`
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${t}" />`
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${d}" />`
  );
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${t}" />`
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${d}" />`
  );
  return out;
}

// server/vite.ts
var __dirname2 = path3.dirname(fileURLToPath2(import.meta.url));
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      const clientPublic = path3.resolve(__dirname2, "..", "client", "public");
      let html = injectPrimarySeoUrls(page, url);
      html = injectPropertyPageHead(html, new URL(url, "http://dev.invalid").pathname, clientPublic);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(__dirname2, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (req, res) => {
    const indexPath = path3.resolve(distPath, "index.html");
    fs2.readFile(indexPath, "utf-8", (err, html) => {
      if (err) {
        log(`Failed to read index.html: ${err}`, "express");
        return res.sendFile(indexPath);
      }
      const pathname = req.path || "/";
      let out = injectPrimarySeoUrls(html, pathname);
      out = injectPropertyPageHead(out, pathname, distPath);
      res.status(200).type("html").send(out);
    });
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  const listenOptions = {
    port,
    host: "0.0.0.0"
  };
  if (process.platform === "linux") {
    listenOptions.reusePort = true;
  }
  server.listen(listenOptions, () => {
    log(`serving on port ${port}`);
  });
})();
