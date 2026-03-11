import express from "express";
const app = express();

import router from "./routes/auth.routes.js";

app.use(express.json());

app.use("/api/v1/auth", router);

export default app;
