import cookieParser from "cookie-parser";
import express from "express";

import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

export const createApp = () => {
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

  return app;
};
