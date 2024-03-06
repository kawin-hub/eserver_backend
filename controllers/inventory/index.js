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
const inventoryLot = require("./inventoryLot.controller")
const inventoryMove = require("./inventoryMove.controller")
const inventoryRequest = require("./inventoryRequest.controller")
const inventoryProductSerial = require("./inventoryProductSerial.controller");
const inventoryProductSerialMove = require("./inventoryProductSerialMove.controller");
const inventoryProductSerialRequest = require("./inventoryProductSerialRequest.controller");

dotenv.config();

// 👉 Inventory Refund

const insertInventoryRefund = async (req, res) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      documentNumber: "required",
    });

    const matched = await validation.check();

    if (matched) {
      const { documentNumber } = req.body;

      const params = {
        documentNumber: documentNumber,
      };

      result = await InventoryModel.insertInventoryRefund(params);
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

module.exports = {
  insertInventoryRefund,

  inventoryTotal,
  inventoryLocation,
  inventoryLot,
  inventoryMove,
  inventoryRequest,
  inventoryProductSerial,
  inventoryProductSerialMove,
  inventoryProductSerialRequest,
};
