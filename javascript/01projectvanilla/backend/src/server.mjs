import http from "node:http";

http
  .createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    if (method === "POST") {
      request
        .on("data", (chunk) => {
          body.push(chunk);
          console.log("Chunk:", chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          console.log("Received POST data:", body);
          response.statusCode = 200;
          response.end("Data received successfully!");
        });
    } else {
      body = null;
    }
    if (method === "GET" && url === "/") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.end("Hello, World!");
    }
    console.log("Headers:", headers);
    console.log("Method:", method);
    console.log("URL:", url);
    console.log("Body:", body);
  })
  .listen(8080); // Activates this server, listening on port 8080.
