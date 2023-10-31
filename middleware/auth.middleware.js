const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
exports.verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined

  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // set the token
    req.accessToken = bearerToken;

    jwt.verify(req.accessToken, process.env.LOGIN_JWT_KEY, (err, authData) => {
      if (err) {
        res
          .status(401)
          .send({ errors: { authentication: ["Unauthorized access token."] } });
      } else {
        if (req.method == "POST" || req.method == "PUT") {
          req.body.authData = authData;
        } else {
          req.params.authData = authData;
        }
        next();
      }
    });
  } else {
    res
      .status(400)
      .send({ errors: { bearerToken: ["Bearer token is missing."] } });
  }
};
