const InventoryProductSerialRefund = require("./inventoryProductSerialRefund.schema");
const { DataResponse } = require("../../general_data.model");

exports.insertProductSerialRefund = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerialRefund.create(params);
    result.data == null
      ? result.doSuccess(
          0,
          "Can't insert to database, please check your request!"
        )
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000 ? result.doError(6, "Serial duplicate!") : result.doError();
  }

  return result;
};

exports.getProductSerialRefundByConditions = async (
  params,
  projection = {}
) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerialRefund.find(
      params,
      projection
    ).lean();
    result.data.length == 0
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    if (e.kind == "ObjectId") {
      result.doError(0, "Please check your _id format");
    } else {
      result.doError(0);
    }
  }

  return result;
};

exports.getProductSerialRequestByRefundId = async (params, projection) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerialRefund.findOne(
      params,
      projection
    ).lean();
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e.kind);
    if (e.kind == "ObjectId") {
      result.doError(0, "Please check your _id format");
    } else {
      result.doError(0);
    }
  }
  return result;
};

exports.updateInventoryProductSerailRefund = async (
  conditions,
  params,
  options = {}
) => {
  var result = new DataResponse();
  try {
    result.data = await InventoryProductSerialRefund.findOneAndUpdate(
      conditions,
      params,
      {
        ...options,
        new: true,
      }
    );
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    result.doError(0);
  }
  return result;
};

exports.getProductSerialRefundbyArrayId = async (
  refund_ids,
  projection = {}
) => {
  var result = new DataResponse();
  try {
    result.data = await InventoryProductSerialRefund.find(
      { _id: { $in: refund_ids } },
      projection
    ).lean();
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    if (e.kind == "ObjectId") {
      result.doError(0, "Please check your _id format");
    } else {
      result.doError(0);
    }
  }

  return result;
};
