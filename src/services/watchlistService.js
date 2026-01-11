import { prisma } from "../config/db.js";

const addToWatchlist = async ({ movieId, userId, status, rating, notes }) => {
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    const err = new Error("Movie not found.");
    err.statusCode = 404;
    throw err;
  }

  const isExistsInWatchlist = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        movieId,
        userId,
      },
    },
  });

  if (isExistsInWatchlist) {
    const err = new Error("Movie already exists in watchlist.");
    err.statusCode = 400;
    throw err;
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId,
      movieId,
      status: status ?? "PLANNED",
      rating,
      notes,
    },
  });

  return watchlistItem;
};

const updateWatchlistItem = async ({ id, userId, status, rating, notes }) => {
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id },
  });

  if (!watchlistItem) {
    const err = new Error("Watchlist item does not exist.");
    err.statusCode = 404;
    throw err;
  }

  if (watchlistItem.userId !== userId) {
    const err = new Error("You are not allowed to update this.");
    err.statusCode = 403;
    throw err;
  }

  const data = Object.fromEntries(
    Object.entries({ status, rating, notes }).filter(
      ([, value]) => value !== undefined
    )
  );

  if (Object.keys(data).length === 0) {
    const err = new Error("No fields provided to update.");
    err.statusCode = 400;
    throw err;
  }

  const updatedWatchlistItem = await prisma.watchlistItem.update({
    where: { id },
    data,
  });

  return updatedWatchlistItem;
};

const removeFromWatchlist = async ({ id, userId }) => {
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id },
  });

  if (!watchlistItem) {
    const err = new Error("Watchlist item does not exist.");
    err.statusCode = 404;
    throw err;
  }

  if (watchlistItem.userId !== userId) {
    const err = new Error("You are not allowed to delete this.");
    err.statusCode = 403;
    throw err;
  }

  await prisma.watchlistItem.delete({
    where: { id },
  });
};

export const watchlistService = {
  addToWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
};
