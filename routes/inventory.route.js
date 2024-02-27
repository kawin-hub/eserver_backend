const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware"));
//const multer = require("multer");
//const upload = multer({ dest: "./assets/images/product/brands/" });

// 👉 Import controller part
const {
  insertInventoryRefund,

  inventoryLocation,
  inventoryLot,
  inventoryMove,
  inventoryRequest,
  inventoryProductSerial,
} = require("../controllers/inventory");

// 👉 Inventory Location

router.get("/locations", inventoryLocation.getInventoryLocations);

router.post("/locations", inventoryLocation.insertInventoryLocation);

router.put("/locations", verifyToken, inventoryLocation.updateInventoryLocation);

router.delete("/locations", verifyToken, inventoryLocation.deleteInventoryLocation);

// 👉 Inventory Lot

router.get("/lots", inventoryLot.getInventoryLots);

router.post("/lots", inventoryLot.insertInventoryLot);

router.delete("/lots", verifyToken, inventoryLot.deleteInventoryLot);

// 👉 Inventory Move

router.get("/moves", inventoryMove.getInventoryMoves);

router.post("/moves", inventoryMove.insertInventoryMove);

// 👉 Inventory Request

router.get("/requests", inventoryRequest.getInventoryRequests);

router.post("/requests", inventoryRequest.insertInventoryRequest);

// 👉 Inventory Refund

router.post("/refunds", insertInventoryRefund);

// 👉 Inventory Product Serial

router.post("/productSerial", inventoryProductSerial.insertProductSerial);

router.delete("/productSerial", inventoryProductSerial.deleteProductSerial);

module.exports = router;
