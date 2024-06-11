//--Soal point ke dua Hello Wordl dengan protokol Http
const http = require("http");
const PORT = 8080;

const reqServer = (req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Hello, World!");
};

const server = http.createServer(reqServer);
server.listen(PORT, () => {
  console.log(`Sever is running on https://localhost:${PORT}`);
});
