import { parseBody } from "../utils/parseBody.js";
import { loginUser } from "../controllers/loginController.js";
import { sessions } from "../db/sessions.js";
import crypto from "node:crypto";

export async function loginRoute(req, res) {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(`
      <h1>Login</h1>
      <form method="POST" action="/login">
        <input name="username"/>
        <input name="password"/>
        <button>Login</button>
      </form>
    `);
  }

  if (req.method === "POST") {
    const body = await parseBody(req);

    const user = loginUser(body.username, body.password);

    if (!user) {
      return res.end("Invalid credentials");
    }

    const sessionId = crypto.randomUUID();

    sessions[sessionId] = {
      username: user.username,
    };

    res.writeHead(302, {
      "Set-Cookie": `sessionId=${sessionId}`,
      Location: "/dashboard",
    });

    res.end();
  }
}
