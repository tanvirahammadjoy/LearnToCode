import mongoose from "mongoose";

export default mongoose.model(
  "User",
  new mongoose.Schema(
    {
      fullname: String,
      username: String,
      email: {
        type: String,
        unique: true,
      },
      password: String,
      refreshToken: String,
      role: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true },
  ),
);
