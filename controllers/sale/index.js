let dotenv = require("dotenv");

// 👉 import module part
const saleLead = require("./saleLead.controller")

dotenv.config();

module.exports = {
    saleLead,
};
