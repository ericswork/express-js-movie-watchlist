import { authService } from "../services/authService.js";
import { clearAuthCookie, setAuthCookie } from "../utils/authCookie.js";

export const register = async (req, res) => {
  try {
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
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      error: err.message || "Error encountered.",
    });
  }
};

export const login = async (req, res) => {
  try {
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
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      error: err.message || "Error encountered.",
    });
  }
};

export const logout = async (_, res) => {
  clearAuthCookie(res);

  return res.status(200).json({
    status: "success",
    message: "Logged out successfully.",
  });
};
