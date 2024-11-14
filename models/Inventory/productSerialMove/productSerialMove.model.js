const InventoryProductSerialMove = require("./inventoryProductSerialMove.schema");
const { DataResponse } = require("../../general_data.model");

// 👉 Insert/Post

exports.insertProductSerialMove = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerialMove.create(params);
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

exports.getProductSerialMoveByMoveId = async (params, projection) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerialMove.findOne(
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

exports.updateInventoryProductSerailMove = async (
  conditions,
  params,
  options = {}
) => {
  var result = new DataResponse();
  try {
    result.data = await InventoryProductSerialMove.findOneAndUpdate(
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

exports.getProductSerialMoveByConditions = async (params, projection = {}) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerialMove.find(
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
