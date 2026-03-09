import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secret";

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
    const { email, password } = data;

    const user = await User.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  },
};
