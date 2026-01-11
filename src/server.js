import { config } from "dotenv";
config();

import { createApp } from "./app.js";
import { connectDB, disconnectDB } from "./config/db.js";

const app = createApp();
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
