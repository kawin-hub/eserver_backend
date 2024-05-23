const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware/"));
const { overViewData } = require("../controllers/dashbord");

router.get("/transections", verifyToken, overViewData.getTransetions);

module.exports = router;
