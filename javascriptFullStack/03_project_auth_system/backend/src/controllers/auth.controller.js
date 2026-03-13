// javascriptFullStack/03_project_auth_system/backend/src/controllers/auth.controller.js
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
      user: {
        id: user._id,
        fullName: user.name,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
export const loginUser = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken, session } = await loginUserService(
      {
        email: req.body.email,
        password: req.body.password,
        deviceInfo: {
          device: req.headers["user-agent"],
          ip: req.ip,
          browser: req.headers["user-agent"],
        },
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.json({
      message: "Login successful",
      user,
      accessToken,
      refreshToken,
      session,
    });
  } catch (error) {
    next(error);
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res, next) => {
  try {
    // const { accessToken } = await refreshTokenService(req.body.tokenRefresh);
    // const { accessToken } = await refreshTokenService(req.body.refreshToken);
    const { accessToken, refreshToken } = await refreshTokenService(
      req.cookies.refreshToken,
      {
        device: req.headers["user-agent"],
        ip: req.ip,
        browser: req.headers["user-agent"],
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
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
    await logoutUserService(req.cookies.refreshToken);
    res.clearCookie("refreshToken");
    res.json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};
