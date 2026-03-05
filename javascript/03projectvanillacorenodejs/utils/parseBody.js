export function parseBody(req) {
  return new Promise((resolve) => {
    let body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsed = Buffer.concat(body).toString();
      const params = new URLSearchParams(parsed);

      const data = {};

      for (const [key, value] of params) {
        data[key] = value;
      }

      resolve(data);
    });
  });
}
