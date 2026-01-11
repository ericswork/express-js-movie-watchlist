const ONE_DAY_MS = 1000 * 60 * 60 * 24;

const getCookieMaxAgeMs = () => {
  // Set to one week
  return 7 * ONE_DAY_MS;
};

export const setAuthCookie = (res, token) => {
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: getCookieMaxAgeMs(),
    path: "/",
  });
};

export const clearAuthCookie = (res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
};
