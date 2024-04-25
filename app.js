const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
  process.exit(0);
});

server.listen(3000);
