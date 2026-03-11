function generateAccessToken(userId) {
  return jwt.sign({ id: userId }, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

function generateRefreshToken(userId) {
  return jwt.sign({ id: userId }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

export { generateAccessToken, generateRefreshToken };
