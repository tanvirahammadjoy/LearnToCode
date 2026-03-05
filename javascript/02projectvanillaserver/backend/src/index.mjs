import http from "node:http";

const server = http.createServer((req, res) => {

  if (req.method === "GET" && req.url === "/") {

    res.writeHead(200, { "Content-Type": "text/html" });

    res.write(`
      <h1>Welcome to the Vanilla Server</h1>
      <form method="POST" action="/">
        <input type="text" name="data" placeholder="Enter some data"/>
        <button type="submit">Submit</button>
      </form>
    `);

    return res.end();
  }

  if (req.method === "POST" && req.url === "/") {

    let body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {

      const parsedBody = Buffer.concat(body).toString();

      console.log("Raw Data:", parsedBody);

      // convert "data=hello" → "hello"
      const value = parsedBody.split("=")[1];

      res.writeHead(200, { "Content-Type": "text/html" });

      res.write(`
        <h1>Data Received</h1>
        <p>Your Data: ${value}</p>
        <a href="/">Go Back</a>
      `);

      res.end();

    });

  }

});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});