// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let ProductModel = require("../../models/Products");
let dotenv = require("dotenv");
let { upload, general } = require("../../middleware");
const fs = require("fs");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { match } = require("assert");
const { ObjectId } = require("mongoose").Types;

// 👉 import module part
const inventoryTotal = require("./inventoryTotal.controller");
const inventoryLocation = require("./inventoryLocation.controller");
const inventoryLot = require("./inventoryLot.controller");
const inventoryMove = require("./inventoryMove.controller");
const inventoryRequest = require("./inventoryRequest.controller");
const inventoryProductSerial = require("./inventoryProductSerial.controller");
const inventoryProductSerialMove = require("./inventoryProductSerialMove.controller");
const inventoryProductSerialRequest = require("./inventoryProductSerialRequest.controller");
const inventoryRefund = require("./inventoryRefund.controller");
const inventoryProductSerialRefund = require("./inventoryProductSerialRefund.controller");

dotenv.config();

module.exports = {
  inventoryRefund,
  inventoryTotal,
  inventoryLocation,
  inventoryLot,
  inventoryMove,
  inventoryRequest,
  inventoryProductSerial,
  inventoryProductSerialMove,
  inventoryProductSerialRequest,
  inventoryProductSerialRefund,
};
