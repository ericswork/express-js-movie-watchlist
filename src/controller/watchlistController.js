import { watchlistService } from "../services/watchlistService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addToWatchlist = asyncHandler(async (req, res) => {
  const { movieId, status, rating, notes } = req.body;
  const userId = req.user.id;

  const watchlistItem = await watchlistService.addToWatchlist({
    movieId,
    userId,
    status,
    rating,
    notes,
  });

  return res.status(201).json({
    status: "success",
    data: {
      watchlistItem,
    },
  });
});

export const updateWatchlistItem = asyncHandler(async (req, res) => {
  const { status, rating, notes } = req.body;
  const id = req.params.id;
  const userId = req.user.id;

  const watchlistItem = await watchlistService.updateWatchlistItem({
    id,
    userId,
    status,
    rating,
    notes,
  });

  return res.status(200).json({
    status: "success",
    data: {
      watchlistItem,
    },
  });
});

export const removeFromWatchlist = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  await watchlistService.removeFromWatchlist({
    id,
    userId,
  });

  return res.status(200).json({
    status: "success",
    message: "Movie successfully deleted from watchlist.",
  });
});
