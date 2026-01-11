import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB connected via Prisma.");
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error(`Database connection error: ${error}`);
  }
};
