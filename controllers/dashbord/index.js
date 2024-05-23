let dotenv = require("dotenv");

// 👉 import module part
const overViewData = require("./overviewData.controller");

dotenv.config();

module.exports = {
  overViewData,
};
