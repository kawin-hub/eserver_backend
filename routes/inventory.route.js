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
  updateInventoryLocation,
} = require("../controllers/inventory.controller");

// InventoryLocation
router.get("/locations", getAllInventoryLocations);

router.post("/locations", insertInventoryLocation);

router.put("/locations", verifyToken, updateInventoryLocation);

router.delete("/locations", verifyToken, deleteInventoryLocation);

// InventoryLot

router.get("/lots", getAllInventoryLots);

router.post("/lots", insertInventoryLot);

router.delete("/lots", verifyToken, deleteInventoryLot);


module.exports = router;
