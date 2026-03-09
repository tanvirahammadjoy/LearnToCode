import authService from "../services/auth.service.js";

export async function register(req, res) {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const token = await authService.login(req.body);

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

export async function me(req, res) {
  res.json(req.user);
}