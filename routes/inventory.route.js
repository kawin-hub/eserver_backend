const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware"));
//const multer = require("multer");
//const upload = multer({ dest: "./assets/images/product/brands/" });

const {
  getInventoryLots,
  insertInventoryLot,
  deleteInventoryLot,
  getInventoryMoves,
  insertInventoryMove,
  getInventoryBorrows,
  insertInventoryBorrow,
  insertInventoryRefund,
  inventoryProductSerial,
  inventoryLocation,
} = require("../controllers/inventory");

// Inventory Location
router.get("/locations", inventoryLocation.getInventoryLocations);

router.post("/locations", inventoryLocation.insertInventoryLocation);

router.put(
  "/locations",
  verifyToken,
  inventoryLocation.updateInventoryLocation
);

router.delete(
  "/locations",
  verifyToken,
  inventoryLocation.deleteInventoryLocation
);

// Inventory Lot

router.get("/lots", getInventoryLots);

router.post("/lots", insertInventoryLot);

router.delete("/lots", verifyToken, deleteInventoryLot);

// Inventory Move

router.get("/moves", getInventoryMoves);

router.post("/moves", insertInventoryMove);

// Inventory Borrow

router.get("/borrows", getInventoryBorrows);

router.post("/borrows", insertInventoryBorrow);

// Inventory Refund

router.post("/refunds", insertInventoryRefund);

// Inventory Lot

router.post("/productSerial", inventoryProductSerial.insertProductSerial);
router.delete("/productSerial", inventoryProductSerial.deleteProductSerial);

module.exports = router;
