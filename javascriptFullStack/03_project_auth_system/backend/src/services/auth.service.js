import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.util.js";
import jwt from "jsonwebtoken";

async function register(data) {
  const { fullname, username, email, password } = data;

  // check email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  // check password is valid
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one letter and one number",
    );
  }

  if (!fullname || !username || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    fullname,
    username,
    email,
    password: hashedPassword,
  });
  return user;
}

async function login(data) {
  const { email, password } = data;

  // check email is exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // check password is valid
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // generate token
  const accessToken = generateAccessToken(user._id, user.email, user.role);
  const refreshToken = generateRefreshToken(user._id, user.email, user.role);

  // update refresh token
  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
}

async function logout(userId) {
  await User.findOneAndUpdate(
    { _id: userId },
    { refreshToken: null },
    { new: true },
  );

  return true;
}

async function refresh(token) {
  const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

  const user = await User.findById(decoded.id);

  if (!user || !user.refreshToken || user.refreshToken !== token) {
    throw new Error("Invalid refresh token");
  }

  const accessToken = generateAccessToken(user._id, user.email, user.role);
  const refreshToken = generateRefreshToken(user._id, user.email, user.role);

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
}

async function me(userId) {
  const user = await User.findById(userId);
  return user;
}

export { register, login, logout, refresh, me };
