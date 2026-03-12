import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
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
  if (!fullName || !userName || !email || !password) {
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });

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
export const loginUserService = async ({ email, password }) => {
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

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

// REFRESH TOKEN
export const refreshTokenService = async (token) => {
  if (!token) {
    throw new Error("Refresh token required");
  }

  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.refreshToken !== token) {
    throw new Error("Invalid refresh token");
  }

  const accessToken = genateAccessToken(user._id);

  const newRefreshToken = genateRefreshToken(user._id);

  user.refreshToken = newRefreshToken;

  await user.save();

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

// LOGOUT
export const logoutUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.refreshToken = null;
  await user.save();

  return true;
};
