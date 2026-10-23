import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { initFirebase } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import membershipRoutes from "./routes/membership.js";
import newsletterRoutes from "./routes/newsletter.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server directory
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Initialize Firebase
initFirebase();

const app = express();

// --- Middleware ---

// CORS — allow frontend requests
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json({ limit: "10kb" }));

// Rate limiting — prevent brute-force attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});
app.use("/api/", apiLimiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});
app.use("/api/auth/", authLimiter);

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/newsletter", newsletterRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FitClub API is running!",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message || err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 FitClub API Server running on http://localhost:${PORT}`);
});
