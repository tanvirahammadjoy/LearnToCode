import { parseCookies } from "../utils/parseCookies.js";
import { sessions } from "../db/sessions.js";

export function dashboardRoute(req, res) {
  const cookies = parseCookies(req);

  const session = sessions[cookies.sessionId];

  if (!session) {
    res.writeHead(401);

    return res.end("Unauthorized");
  }

  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(`
    <h1>Dashboard</h1>
    <p>Welcome ${session.username}</p>
  `);
}
