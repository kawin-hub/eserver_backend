const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware"));
//const multer = require("multer");
//const upload = multer({ dest: "./assets/images/product/brands/" });

const {
  getAllInventoryLocations,
  insertInventoryLocation,
  getAllInventoryLots,
  insertInventoryLot,
  deleteInventoryLot,
  deleteInventoryLocation,
  updateInventoryLocation
} = require("../controllers/inventory.controller");

// InventoryLocation
router.get("/locations", verifyToken, getAllInventoryLocations);

router.post("/locations", verifyToken, insertInventoryLocation);

router.put("/locations", verifyToken, updateInventoryLocation);

router.delete("/locations", verifyToken, deleteInventoryLocation);

// InventoryLot

router.get("/lots", verifyToken, getAllInventoryLots);

router.post("/lots", verifyToken, insertInventoryLot);

router.delete("/lots", verifyToken, deleteInventoryLot);

module.exports = router;