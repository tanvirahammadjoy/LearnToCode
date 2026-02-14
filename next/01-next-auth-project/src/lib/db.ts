import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    console.log("MONGODB_URI:", process.env.MONGODB_URI);
    console.log("Connected to:", mongoose.connection.host);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB successfully");
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
