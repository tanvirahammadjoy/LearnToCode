// javascriptFullStack/03_project_auth_system/backend/src/services/auth.service.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import userSession from "../models/user.session.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import {
  genateAccessToken,
  genateRefreshToken,
} from "../utils/generateToken.js";

// REGISTER
export const registerUserService = async ({
  fullName,
  userName,
  email,
  password,
}) => {
  const userExists = await User.findOne({ $or: [{ email }, { userName }] });

  if (userExists) {
    throw new Error("User already exists");
  }

  const hashed = await hashPassword(password);

  const user = await User.create({
    fullName,
    userName,
    email,
    password: hashed,
  });

  return user;
};

// LOGIN
export const loginUserService = async ({ email, password, deviceInfo }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const match = await comparePassword(password, user.password);

  if (!match) {
    throw new Error("Invalid credentials");
  }

  const accessToken = genateAccessToken(user._id);
  const refreshToken = genateRefreshToken(user._id);

  const session = await userSession.create({
    userId: user._id,
    refreshToken,
    device: deviceInfo.device,
    ip: deviceInfo.ip,
    browser: deviceInfo.browser,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  });

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user,
    session,
    accessToken,
    refreshToken,
  };
};

// REFRESH TOKEN
export const refreshTokenService = async (token, deviceInfo = {}) => {
  if (!token) {
    throw new Error("Refresh token required");
  }

  // 1️⃣ Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new Error("Invalid refresh token");
  }

  // 2️⃣ Find the session
  const session = await userSession.findOne({ refreshToken: token });

  if (!session) {
    throw new Error("Session not found or token invalidated");
  }

  // 3️⃣ Optional: check if session expired
  if (session.expiresAt < new Date()) {
    await session.deleteOne();
    throw new Error("Session expired");
  }

  // 4️⃣ Generate new tokens
  const accessToken = genateAccessToken(decoded.id);
  const newRefreshToken = genateRefreshToken(decoded.id);

  // 5️⃣ Rotate refresh token in session
  session.refreshToken = newRefreshToken;
  session.device = deviceInfo.device || session.device;
  session.ip = deviceInfo.ip || session.ip;
  session.browser = deviceInfo.browser || session.browser;
  session.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  await session.save();

  // 6️⃣ Update user refresh token (optional, for legacy code)
  const user = await User.findById(decoded.id);
  user.refreshToken = newRefreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

// LOGOUT
export const logoutUserService = async (refreshToken) => {
  // 1️⃣ Find the session
  const session = await userSession.findOne({ refreshToken });

  if (!session) {
    throw new Error("Session not found");
  }

  // 2️⃣ Delete the session
  await session.deleteOne();

  // 3️⃣ Optional: clear user.refreshToken if you still track single token
  const user = await User.findById(session.userId);
  if (user.refreshToken === refreshToken) {
    user.refreshToken = null;
    await user.save();
  }

  return true;
};
