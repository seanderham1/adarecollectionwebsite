import * as functions from "firebase-functions";
import express from "express";

const app = express();

// Example endpoint: GET /api/hello
app.get("/hello", (_req, res) => {
  res.json({ ok: true, message: "Hello from Firebase Functions" });
});

// Export the HTTPS function that Hosting rewrites /api/** to
export const api = functions.https.onRequest(app);
