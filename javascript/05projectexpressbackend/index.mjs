import express from "express";
const app = express();
const port = 3000;

app.use("/static",express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});

app.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});

app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
