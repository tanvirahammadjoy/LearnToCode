import { parseBody } from "../utils/parseBody.js";
import { registerUser } from "../controllers/registerController.js";

export async function registerRoute(req, res) {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(`
      <h1>Register</h1>
      <form method="POST" action="/register">
        <input name="username" placeholder="username"/>
        <input name="password" placeholder="password"/>
        <button>Register</button>
      </form>
    `);
  }

  if (req.method === "POST") {
    const body = await parseBody(req);

    registerUser(body.username, body.password);

    res.writeHead(302, {
      Location: "/login",
    });

    res.end();
  }
}
