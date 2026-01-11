import { prisma } from "../config/db.js";

export const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;
  const userId = req.user.id;

  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({
      error: "Movie not found.",
    });
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
    return res.status(400).json({
      error: "Movie already exists in watchlist.",
    });
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId,
      movieId,
      status: status || WatchlistStatus.PLANNED,
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "success",
    data: {
      watchlistItem,
    },
  });
};

export const updateWatchlistItem = async (req, res) => {
  const { status, rating, notes } = req.body;
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({
      error: "Watchlist item does not exist.",
    });
  }

  if (watchlistItem.userId !== req.user.id) {
    return res.status(403).json({
      error: "You are not allowed to update this.",
    });
  }

  const data = Object.fromEntries(
    Object.entries({ status, rating, notes }).filter(
      ([, value]) => value !== undefined
    )
  );

  if (!Object.keys(data).length) {
    return res.status(200).json({
      status: "success",
      message: "No updates performed.",
    });
  }

  const updatedWatchlistItem = await prisma.watchlistItem.update({
    where: { id: req.params.id },
    data,
  });

  res.status(200).json({
    status: "success",
    data: {
      updatedWatchlistItem,
    },
  });
};

export const removeFromWatchlist = async (req, res) => {
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({
      error: "Watchlist item does not exist.",
    });
  }

  if (watchlistItem.userId !== req.user.id) {
    return res.status(403).json({
      error: "You are not allowed to remove this.",
    });
  }

  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    message: "Movie successfully deleted from watchlist.",
  });
};
