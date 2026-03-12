import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

export const registerUserService = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const hashed = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  return user;
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const match = await comparePassword(password, user.password);

  if (!match) {
    throw new Error("Invalid credentials");
  }

  return user;
};