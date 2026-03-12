import generateToken from "../utils/generateToken.js";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.service.js";

export const registerUser = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);

    res.status(201).json({
      message: "User registered",
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await loginUserService(req.body);

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};
