const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "ubiJT;YPsr3[kosws{S;p7-X;-9;xJ",
});

module.exports = pool;
