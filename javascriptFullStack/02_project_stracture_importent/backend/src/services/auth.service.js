import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.util.js";

export default {
  async register(data) {
    const { name, email, password } = data;

    const user = await User.findOne({ email }).lean();

    if (user) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return newUser;
  },

  async login(data) {
    const { email, password } = data;

    const user = await User.findOne({ email }).lean();

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  },

  async logout(userId) {
    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    user.refreshToken = null;
    await user.save();
  },

  async refresh(token) {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    const user = await User.findById(decoded.id).lean();

    if (!user || !user.refreshToken || user.refreshToken !== token) {
      throw new Error("Invalid refresh token");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  },
};
