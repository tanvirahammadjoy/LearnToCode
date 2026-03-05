export function parseCookies(req) {
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) return {};

  const cookies = {};

  cookieHeader.split(";").forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = value;
  });

  return cookies;
}
