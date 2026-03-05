import http from "node:http";

import { registerRoute } from "./routes/registerRoute.js";
import { loginRoute } from "./routes/loginRoute.js";
import { dashboardRoute } from "./routes/dashboardRoute.js";

const server = http.createServer((req, res) => {
  if (req.url === "/register") {
    return registerRoute(req, res);
  }

  if (req.url === "/login") {
    return loginRoute(req, res);
  }

  if (req.url === "/dashboard") {
    return dashboardRoute(req, res);
  }

  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(`
    <h1>Home</h1>
    <a href="/register">Register</a>
    <br/>
    <a href="/login">Login</a>
  `);
});

server.listen(3000, () => {
  console.log("Server running http://localhost:3000");
});
