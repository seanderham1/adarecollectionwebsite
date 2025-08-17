import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import express from "express";
import cors from "cors";
import * as functionsV1 from "firebase-functions/v1"; // Gen 1

const app = express();
app.use(cors({ origin: true }));

// Add this middleware to log all requests
app.use((req, res, next) => {
  logger.info(`Request path: ${req.path}, URL: ${req.url}, method: ${req.method}`);
  next();
});

app.get("/hello", (_req, res) => {
  logger.info("hello endpoint hit");
  res.json({ ok: true, message: "Hello from Firebase Functions (Gen 2)!" });
});

// Add this new route to handle the /api/hello path
app.get("/api/hello", (_req, res) => {
  logger.info("api/hello endpoint hit");
  res.json({ ok: true, message: "Hello from Firebase Functions (Gen 2) via /api/hello!" });
});

// Add a catch-all to see what paths are being requested
app.get("*", (req, res) => {
  logger.info(`Unmatched path: ${req.path}, URL: ${req.url}`);
  res.json({ 
    path: req.path, 
    url: req.url, 
    message: "Debug info - this path was not matched",
    availableRoutes: ["/hello", "/api/hello"]
  });
});

// Gen-2 (kept for later, currently blocked by IAM)
export const api = onRequest(
  { region: "us-central1", memory: "256MiB", timeoutSeconds: 60, cors: true },
  app
);

// Gen-1 fallback that avoids Cloud Run IAM
export const apiV1 = functionsV1
  .region("us-central1")
  .https.onRequest((_req, res) => {
    res.json({ ok: true, message: "Hello from Firebase Functions (Gen 1)!" });
  });