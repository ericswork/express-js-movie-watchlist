# Express.js Movie Watchlist API

Tutorial by PedroTech: https://www.youtube.com/watch?v=g09PoiCob4Y

A REST API for managing a personal **movie watchlist**, built with **Express.js** and **Prisma**.  
Includes **JWT authentication** (stored in an **HttpOnly cookie**) and endpoints for managing watchlist items (status, rating, notes).

---

## Features

- **Auth**
  - Register
  - Login
  - Logout
  - JWT issued and stored as an **HttpOnly cookie** (`jwt`)
- **Watchlist**
  - Add a movie to your watchlist
  - Update watchlist item (status / rating / notes)
  - Remove watchlist item
- **Validation**
  - Request validation (e.g., Zod-based schemas for watchlist inputs)
- **Database**
  - Prisma ORM (configure via `DATABASE_URL`)

---

## Tech Stack

- Node.js + Express.js
- Prisma ORM
- JWT auth (cookie-based)
- cookie-parser (for reading cookies on incoming requests)
