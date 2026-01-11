import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  const bearer =
    header && header.startsWith("Bearer") ? header.split(" ")[1] : null;
  const cookieToken = req.cookies?.jwt ?? null;

  const token = bearer || cookieToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true },
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    req.user = user;
    return next();
  } catch (err) {
    console.error("Error encountered:", err);
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
