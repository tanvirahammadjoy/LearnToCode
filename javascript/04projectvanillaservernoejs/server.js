import http from "node:http";
import { users } from "./db/db.js";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the User API");
    return;
  }
  if (req.url === "/register" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Registration</title>
</head>
<body>
    <h1>User Registration</h1>
    <form action="/register" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <button type="submit">Register</button>
    </form>
</body>
</html>`);
    return;
  }
  if (req.url === "/register" && req.method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const userData = Buffer.concat(body).toString();

      const params = new URLSearchParams(userData);
      const name = params.get("name");

      const newUser = { id: users.length + 1, name };
      users.push(newUser);

      res.writeHead(201, {
        "Content-Type": "application/json",
        Location: "/users",
      });
      res.end(
        JSON.stringify({
          message: "User registered successfully",
          user: newUser,
        }),
      );
      // redirect to /users after registration
      // res.writeHead(302, { Location: "/users" });
      // res.end();
    });

    return;
  }
  if (req.url === "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
    return;
  }
  res.writeHead(404);
  res.end("Not Found");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
