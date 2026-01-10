import { z } from "zod";

const WATCHLIST_STATUSES = ["PLANNED", "WATCHING", "COMPLETED", "DROPPED"];

const watchlistFields = {
  status: z
    .enum(WATCHLIST_STATUSES, {
      error: () => ({
        message:
          "Status must be one of: { PLANNED, WATCHING, COMPLETED, DROPPED }",
      }),
    })
    .optional(),

  rating: z.coerce
    .number()
    .int("Rating must be an integer.")
    .min(1, "Rating must be between 1 and 10.")
    .max(10, "Rating must be between 1 and 10.")
    .optional(),

  notes: z.string().optional(),
};

export const addToWatchlistSchema = z.object({
  movieId: z.uuid(),
  ...watchlistFields,
});

export const updateWatchlistSchema = z.object({
  ...watchlistFields,
});
