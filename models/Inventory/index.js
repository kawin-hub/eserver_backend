const { DataResponse } = require("../general_data.model");

// 👉 import module part
const total = require("./total/total.model")
const location = require("./location/location.model")
const lot = require("./lot/lot.model")
const move = require("./move/move.model")
const request = require("./request/request.model")
const productSerial = require("./productSerial/productSerial.model");
const productSerialMove = require("./productSerialMove/productSerialMove.model");
const productSerialRequest = require("./productSerialRequest/productSerialRequest.model");

//Inventory Refund

const insertInventoryRefund = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryRefund.create(params);
    result.data == null
      ? result.doSuccess(
        0,
        "Can't insert to database, please check your request!"
      )
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doError(6, "Refund index duplicate!")
      : result.doError();
  }

  return result;
};

module.exports = {
  insertInventoryRefund,

  total,
  location,
  lot,
  move,
  request,
  productSerial,
  productSerialMove,
  productSerialRequest,
};
