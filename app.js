const http = require("http");

const express = require("express");

const app = express();

// console.log(routes.someText);

const server = http.createServer(routes.handler);
server.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
