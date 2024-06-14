const express = require("express");
const app = express();
const path = require("path");
const PORT = 8080;

app.use((req, res, next) => {
  console.log(`Request from ${req.url} With ${req.method}`);
  next();
});
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to route level",
  });
});
app.get("/hello", (req, res) => {
  res.json({
    message: "Success fetch message",
    data: "Hello World!",
  });
});
app.get("/user", (req, res) => {
  const data = {
    id: 1,
    name: "Budi",
    username: "budidu",
    email: "budidu@mail.com",
  };
  res.json({
    message: "Success fetch user",
    data: data,
  });
});

app.use(express.static(path.join(__dirname, "public")));
app.get("/document", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.listen(PORT, console.log(`Server is running on http:localhost:${PORT}`));
