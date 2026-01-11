import { authService } from "../services/authService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { clearAuthCookie, setAuthCookie } from "../utils/authCookie.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const { user, token } = await authService.register({
    name,
    email,
    password,
  });
  setAuthCookie(res, token);

  return res.status(201).json({
    status: "Success",
    data: {
      user,
      token,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await authService.login({
    email,
    password,
  });
  setAuthCookie(res, token);

  return res.status(200).json({
    status: "Success",
    data: {
      user,
      token,
    },
  });
});

export const logout = async (_, res) => {
  clearAuthCookie(res);

  return res.status(200).json({
    status: "success",
    message: "Logged out successfully.",
  });
};
