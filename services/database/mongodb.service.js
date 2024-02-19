const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  db: process.env.DB_CONN_STRING,
  dbName: process.env.DB_NAME,
};
