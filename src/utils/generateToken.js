import jwt from "jsonwebtoken";

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

const generateToken = (userId, res) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ONE_DAY_MS * 7,
    path: "/",
  });
  return token;
};

export { generateToken };
