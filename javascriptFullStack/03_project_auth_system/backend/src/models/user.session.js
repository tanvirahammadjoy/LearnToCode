import mongoose from "mongoose";

const userSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  browser: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("UserSession", userSessionSchema);
