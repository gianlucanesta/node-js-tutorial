const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "node-complete",
  "root",
  "ubiJT;YPsr3[kosws{S;p7-X;-9;xJ",
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
