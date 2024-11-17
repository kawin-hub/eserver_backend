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
  inventoryRefund,
  inventoryProductSerialRefund,
} = require("../controllers/inventory");

// 👉 Inventory Total

/* router.get("/totals", inventoryTotal.getInventoryTotals); */
router.get("/totals", verifyToken, inventoryTotal.getProductTotal);

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
router.get("/lots/job", verifyToken, inventoryLot.getInventoryLotsByJob);
router.post("/lots", verifyToken, inventoryLot.insertInventoryLot);
router.delete("/lots", verifyToken, inventoryLot.deleteInventoryLot);
router.put("/lots", verifyToken, inventoryLot.updateInventoryLot);
router.put(
  "/lots/status",
  verifyToken,
  inventoryLot.updateCurrentStatusInventoryLot
);
router.put(
  "/lots/deleteLocation",
  verifyToken,
  inventoryLot.updateLocationsSelected
);

// 👉 Inventory Move

router.get("/moves", verifyToken, inventoryMove.getInventoryMoves);
router.post("/moves", verifyToken, inventoryMove.insertInventoryMove);
router.delete("/moves", verifyToken, inventoryMove.deleteInventoryMove);
router.get("/moves/newMoveId", verifyToken, inventoryMove.getNewMoveId);
router.get(
  "/moves/products",
  verifyToken,
  inventoryMove.getProductsSerialByMove
);
router.put("/moves", verifyToken, inventoryMove.updateInventoryMove);
router.get("/moves/job", verifyToken, inventoryMove.getInventoryAllMoveByJob);
// 👉 Inventory Request

router.get(
  "/requests/bySellStatus",
  verifyToken,
  inventoryRequest.getInventoryRequestBySellStatus
);

router.get(
  "/requests",
  verifyToken,
  inventoryRequest.getInventoryAllRequestDetail
);
router.get(
  "/requests/job",
  verifyToken,
  inventoryRequest.getInventoryAllRequestByJob
);
router.post("/requests", verifyToken, inventoryRequest.insertInventoryRequest);
router.put("/requests", verifyToken, inventoryRequest.updateInventoryRequest);
router.put(
  "/requests/status",
  verifyToken,
  inventoryRequest.updateStatusRequestDone
);
router.delete(
  "/requests",
  verifyToken,
  inventoryRequest.deleteInventoryRequest
);

router.get(
  "/requests/newRequestNumber",
  verifyToken,
  inventoryRequest.getNewRequestNumber
);

// 👉 Inventory Refund

router.get("/refunds", verifyToken, inventoryRefund.getInventoryRefunds);
router.get(
  "/refunds/job",
  verifyToken,
  inventoryRefund.getInventoryRefundsByjob
);
router.post("/refunds", verifyToken, inventoryRefund.insertInventoryRefund);
router.get(
  "/refunds/newRefundNumber",
  verifyToken,
  inventoryRefund.getNewRefundNumber
);
router.get(
  "/refunds/requestNumber",
  verifyToken,
  inventoryRefund.getProductsRequestByRefund
);
router.put("/refunds", verifyToken, inventoryRefund.updateInventoryRefund);
// 👉 Inventory Product Serial

router.post(
  "/productSerial",
  verifyToken,
  inventoryProductSerial.insertProductSerial
);
router.delete(
  "/productSerial",
  verifyToken,
  inventoryProductSerial.deleteProductSerial
);
router.get(
  "/productSerial",
  verifyToken,
  inventoryProductSerial.getProductSerialAll
);
router.put(
  "/productSerial",
  verifyToken,
  inventoryProductSerial.scanOutProduct
);
router.put(
  "/productSerial/refund",
  verifyToken,
  inventoryProductSerial.scanRefundProduct
);

router.put(
  "/productSerial/move",
  verifyToken,
  inventoryProductSerial.scanMoveProduct
);
router.put(
  "/productSerial/arrayProducts",
  verifyToken,
  inventoryProductSerial.updateActiveProducts
);

router.get(
  "/productSerial/lotIds",
  verifyToken,
  inventoryProductSerial.getProductSerialByLotIds
);
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
router.get(
  "/productSerialRequest",
  verifyToken,
  inventoryProductSerialRequest.getProductSerialRequests
);
router.delete(
  "/productSerialRequest",
  verifyToken,
  inventoryProductSerialRequest.deleteProductRequest
);

router.post(
  "/productSerialRefund",
  verifyToken,
  inventoryProductSerialRefund.insertProductSerialRefund
);

router.get(
  "/productSerialRefund",
  verifyToken,
  inventoryProductSerialRefund.getProductSerialRefundByRefundId
);

router.get(
  "/productSerialMove",
  verifyToken,
  inventoryProductSerialMove.getProductSerialMoveByMoveId
);

module.exports = router;
