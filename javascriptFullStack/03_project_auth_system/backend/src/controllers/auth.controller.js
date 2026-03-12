import {
  registerUserService,
  loginUserService,
  refreshTokenService,
  logoutUserService,
} from "../services/auth.service.js";

// REGISTER
export const registerUser = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);

    res.status(201).json({
      message: "User registered",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
export const loginUser = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await loginUserService(
      req.body,
    );

    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res, next) => {
  try {
    const { accessToken } = await refreshTokenService(req.body.token);

    res.json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// LOGOUT
export const logoutUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    await logoutUserService(userId);

    res.json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};
