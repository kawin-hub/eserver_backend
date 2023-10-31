const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware/"));
//const multer = require("multer");
//const upload = multer({ dest: "./assets/images/product/brands/" });

const {
  getAllInventoryLocations,
} = require("../controllers/inventory.controller");

// ProductCategories
router.post("/categories", verifyToken, getAllInventoryLocations);

module.exports = router;
