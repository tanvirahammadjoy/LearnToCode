import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

export function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, ACCESS_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(userId) {
  return jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: "7d" });
}
