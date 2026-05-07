import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { GLOBAL_SCHEMA_GRAPH } from "./client/src/lib/seo-global-graph";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function injectGlobalSchemaLdJson(): Plugin {
  const tag = `<!--INJECT_GLOBAL_SCHEMA_LD_JSON-->`;
  return {
    name: "inject-global-schema-ld-json",
    transformIndexHtml(html) {
      if (!html.includes(tag)) return html;
      const json = JSON.stringify(GLOBAL_SCHEMA_GRAPH);
      return html.replace(
        tag,
        `<script type="application/ld+json">${json}</script>`,
      );
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    injectGlobalSchemaLdJson(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-select', '@radix-ui/react-dialog', '@radix-ui/react-toast'],
        },
      },
    },
    minify: 'esbuild',
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
