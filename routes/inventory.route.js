const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware"));
//const multer = require("multer");
//const upload = multer({ dest: "./assets/images/product/brands/" });

const {
  getInventoryLocations,
  insertInventoryLocation,
  getInventoryLots,
  insertInventoryLot,
  deleteInventoryLot,
  deleteInventoryLocation,
  updateInventoryLocation,
  getInventoryMoves,
  insertInventoryMove,
  getInventoryBorrows,
  insertInventoryBorrow,
  insertInventoryRefund,
} = require("../controllers/inventory.controller");

// Inventory Location
router.get("/locations", getInventoryLocations);

router.post("/locations", insertInventoryLocation);

router.put("/locations", verifyToken, updateInventoryLocation);

router.delete("/locations", verifyToken, deleteInventoryLocation);

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

module.exports = router;
