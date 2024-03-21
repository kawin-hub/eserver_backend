const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware/"));
const {
  auth,
  doRefreshToken,
  getAllUsers,
  getUser,
} = require("../controllers/user.controller");

//Authentication
router.post("/auth", auth);

//RefreshToken
router.post("/refreshtoken", doRefreshToken);

//Get all user
router.get("/", verifyToken, getAllUsers);
router.get("/user", verifyToken, getUser);

module.exports = router;
