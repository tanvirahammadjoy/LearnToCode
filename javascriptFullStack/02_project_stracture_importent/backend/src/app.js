import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: [".env", ".env.local", "../.env"] });

// Import routes
import authrouts from "./routes/auth.route.js";

// Initialize Express application
// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// routes
app.use("/api/v1/auth", authrouts);

export default app;
