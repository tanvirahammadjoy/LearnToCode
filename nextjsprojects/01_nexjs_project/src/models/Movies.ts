import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    fullplot: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "movies" },
);

export const Movie = mongoose.model("Movie", MovieSchema);
