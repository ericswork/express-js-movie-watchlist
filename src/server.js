import { config } from "dotenv";
config();

import cookieParser from "cookie-parser";
import express from "express";

import { connectDB, disconnectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.get("/health", (_, res) =>
  res.status(200).json({
    status: "ok",
  })
);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);

// 404 Handler
app.use((_, res) => {
  res.status(404).json({
    error: "Route not found.",
  });
});

// Default error handler
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(error.statusCode || 500).json({
    error: error.message || "Internal server error.",
  });
});

const PORT = process.env.PORT || 5001;

let server;

const start = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server.", error);
    await disconnectDB();
    process.exit(1);
  }
};

start();

const shutdown = async (signal) => {
  try {
    console.log(`${signal} received, shutting down gracefully...`);
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error("Error shutting down.", error);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  shutdown("unhandledRejection");
});

process.on("uncaughtException", async (err) => {
  console.error("Uncaught exception:", err);
  shutdown("uncaughtException");
});

process.on("SIGTERM", (err) => {
  shutdown("SIGTERM");
});

process.on("SIGINT", (err) => {
  shutdown("SIGINT");
});
