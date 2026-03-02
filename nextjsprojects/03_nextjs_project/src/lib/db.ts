import mongoose from "mongoose";

export default async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) return;

    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    console.log(error);
  }
}
