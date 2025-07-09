const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware/"));

const tailwind = require("../services/third_party/tailwind/build-tailwind");

// ProductCategories
router.post("/build-tailwind", tailwind.build);

module.exports = router;
