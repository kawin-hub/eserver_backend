const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware"));
//const multer = require("multer");
//const upload = multer({ dest: "./assets/images/product/brands/" });

// 👉 Import controller part
const {
  insertInventoryRefund,

  inventoryTotal,
  inventoryLocation,
  inventoryLot,
  inventoryMove,
  inventoryRequest,
  inventoryProductSerial,
  inventoryProductSerialMove,
  inventoryProductSerialRequest,
} = require("../controllers/inventory");

// 👉 Inventory Total

router.get("/totals", inventoryTotal.getInventoryTotals);

// 👉 Inventory Location

router.get("/locations", verifyToken, inventoryLocation.getInventoryLocations);

router.post(
  "/locations",
  verifyToken,
  inventoryLocation.insertInventoryLocation
);

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

// 👉 Inventory Lot

router.get("/lots", verifyToken, inventoryLot.getInventoryLots);

router.post("/lots", verifyToken, inventoryLot.insertInventoryLot);

router.delete("/lots", verifyToken, inventoryLot.deleteInventoryLot);

// 👉 Inventory Move

router.get("/moves", verifyToken, inventoryMove.getInventoryMoves);

router.post("/moves", verifyToken, inventoryMove.insertInventoryMove);

// 👉 Inventory Request

router.get("/requests", verifyToken, inventoryRequest.getInventoryRequests);

router.post("/requests", verifyToken, inventoryRequest.insertInventoryRequest);

// 👉 Inventory Refund

router.post("/refunds", insertInventoryRefund);

// 👉 Inventory Product Serial

router.post(
  "/productSerial",
  verifyToken,
  inventoryProductSerial.insertProductSerial
);

router.delete("/productSerial", inventoryProductSerial.deleteProductSerial);

// 👉 Inventory Product Serial Move

router.post(
  "/productSerialMove",
  verifyToken,
  inventoryProductSerialMove.insertProductSerialMove
);

// 👉 Inventory Product Serial Request

router.post(
  "/productSerialRequest",
  verifyToken,
  inventoryProductSerialRequest.insertProductSerialRequest
);

module.exports = router;
