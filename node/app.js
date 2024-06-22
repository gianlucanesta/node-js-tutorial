const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todos");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("Some middleware");
  next();
});

app.use("/todos", todoRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
