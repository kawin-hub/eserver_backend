const auth = require("./auth.middleware");
const upload = require("./upload.middleware")

module.exports = { auth, verifyToken: auth.verifyToken, upload };
