import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  async register(data) {
    const { name, email, password } = data;

    // const existingUser = await User.findByEmail(email);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  },

  async login(data) {
    const JWT_SECRET = process.env.JWT_SECRET;
    console.log(JWT_SECRET);
    const { email, password } = data;

    // const user = await User.findByEmail(email);
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    user.refreshToken = token;
    await user.save();

    return token;
  },

  async logout(userId) {
    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    user.refreshToken = null;

    await user.save();
  },
};
