import jwt from "jsonwebtoken";

export function generateAccessToken(userId) {
  const ACCESS_SECRET = process.env.ACCESS_SECRET;
  console.log("ACCESS_SECRET", ACCESS_SECRET);
  return jwt.sign({ id: userId }, ACCESS_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(userId) {
  const REFRESH_SECRET = process.env.REFRESH_SECRET;
  console.log("REFRESH_SECRET", REFRESH_SECRET);
  return jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: "7d" });
}
