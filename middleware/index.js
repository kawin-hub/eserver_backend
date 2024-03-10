const auth = require("./auth.middleware");
const upload = require("./upload.middleware");
const general = require("./general.middleware");

module.exports = {
  auth,
  verifyToken: auth.verifyToken,
  upload,
  general,
};
