const http = require("http");

const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware");
  next();
});

app.use((req, res, next) => {
  console.log("In another middleware");
});

// console.log(routes.someText);

const server = http.createServer(app);
server.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
