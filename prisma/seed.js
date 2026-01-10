import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = "458757a7-5991-40a8-8d27-5bbb641b09c1";

const movies = [
  {
    title: "Inception",
    overview:
      "A skilled thief is offered a chance to erase his criminal history by planting an idea into a target's subconscious.",
    releaseYear: 2010,
    genres: ["Sci-Fi", "Action", "Thriller"],
    runtime: 148,
    posterUrl: "https://image.tmdb.org/t/p/w500/inception.jpg",
    createdBy: userId,
  },
  {
    title: "The Dark Knight",
    overview:
      "Batman faces the Joker, a criminal mastermind who plunges Gotham City into chaos.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl: "https://image.tmdb.org/t/p/w500/dark_knight.jpg",
    createdBy: userId,
  },
  {
    title: "Interstellar",
    overview:
      "A group of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: 2014,
    genres: ["Sci-Fi", "Drama", "Adventure"],
    runtime: 169,
    posterUrl: "https://image.tmdb.org/t/p/w500/interstellar.jpg",
    createdBy: userId,
  },
  {
    title: "Parasite",
    overview:
      "A poor family schemes to become employed by a wealthy household by infiltrating their lives.",
    releaseYear: 2019,
    genres: ["Thriller", "Drama"],
    runtime: 132,
    posterUrl: "https://image.tmdb.org/t/p/w500/parasite.jpg",
    createdBy: userId,
  },
  {
    title: "The Matrix",
    overview:
      "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    releaseYear: 1999,
    genres: ["Sci-Fi", "Action"],
    runtime: 136,
    posterUrl: "https://image.tmdb.org/t/p/w500/matrix.jpg",
    createdBy: userId,
  },
  {
    title: "Forrest Gump",
    overview:
      "The life journey of a kind-hearted man who witnesses and influences historical events.",
    releaseYear: 1994,
    genres: ["Drama", "Romance"],
    runtime: 142,
    posterUrl: "https://image.tmdb.org/t/p/w500/forrest_gump.jpg",
    createdBy: userId,
  },
  {
    title: "Fight Club",
    overview:
      "An office worker forms an underground fight club that evolves into something much more dangerous.",
    releaseYear: 1999,
    genres: ["Drama", "Thriller"],
    runtime: 139,
    posterUrl: "https://image.tmdb.org/t/p/w500/fight_club.jpg",
    createdBy: userId,
  },
  {
    title: "Pulp Fiction",
    overview:
      "The lives of criminals intertwine through a series of violent and darkly humorous events.",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    runtime: 154,
    posterUrl: "https://image.tmdb.org/t/p/w500/pulp_fiction.jpg",
    createdBy: userId,
  },
  {
    title: "Spirited Away",
    overview:
      "A young girl enters a magical world ruled by gods, spirits, and strange creatures.",
    releaseYear: 2001,
    genres: ["Animation", "Fantasy", "Adventure"],
    runtime: 125,
    posterUrl: "https://image.tmdb.org/t/p/w500/spirited_away.jpg",
    createdBy: userId,
  },
  {
    title: "Whiplash",
    overview:
      "A young drummer pushes himself to the limit under the ruthless mentorship of an instructor.",
    releaseYear: 2014,
    genres: ["Drama", "Music"],
    runtime: 107,
    posterUrl: "https://image.tmdb.org/t/p/w500/whiplash.jpg",
    createdBy: userId,
  },
];

const main = async () => {
  console.log("Seeding movies...");
  await prisma.movie.createMany({
    data: movies,
  });
  console.log("Seeding movies completed.");
};

main()
  .catch((err) => {
    console.error(`Error seeding: ${err.message}`);
    process.exit(1);
  })
  .finally(await prisma.$disconnect());
