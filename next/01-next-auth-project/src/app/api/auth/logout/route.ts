export async function POST() {
  const response = Response.json({ message: "Logged out" });

  response.headers.set(
    "Set-Cookie",
    "token=; HttpOnly; Path=/; Max-Age=0"
  );

  return response;
}