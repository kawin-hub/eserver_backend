let dotenv = require("dotenv");

// 👉 import module part
const accountExpense = require("./accountExpense.controller");

dotenv.config();

module.exports = {
  accountExpense,
};
