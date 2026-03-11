import authService from "../services/auth.service.js";

export async function register(req, res) {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      message: "User created",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
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

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

export async function logout(req, res) {
  try {
    await authService.logout(req.user.id);

    res.json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function refresh(req, res) {
  try {
    const token = await authService.refresh(req.cookies.refreshToken);

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json(token);
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

export async function me(req, res) {
  try {
    const user = await authService.me(req.user.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
