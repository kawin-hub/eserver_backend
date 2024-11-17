const InventoryProductSerialRequest = require("./inventoryProductSerialRequest.schema");
const { DataResponse } = require("../../general_data.model");

// 👉 Insert/Post

exports.insertProductSerialRequest = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerialRequest.create(params);
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

exports.getProductSerialRequestByConditions = async (
  params,
  projection = {}
) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerialRequest.find(
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

exports.getProductSerialRequestByRequestId = async (params, projection) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerialRequest.findOne(
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

exports.updateInventoryProductSerailRequest = async (
  conditions,
  params,
  options = {}
) => {
  var result = new DataResponse();
  try {
    result.data = await InventoryProductSerialRequest.findOneAndUpdate(
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

exports.getAllInventoryProductSerialRequest = async () => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await InventoryProductSerialRequest.find(
      queryCondition,
      {
        _id: 1,
        createdAt: 1,
        inventoryRequest: 1,
        productModel: 1,
        updatedAt: 1,
        inventoryProductSerial: 1,
        createdBy: 1,
      }
    )
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .lean();

    result.doSuccess(1);

    var countTotalRow = await InventoryProductSerialRequest.countDocuments(
      params.queryCondition
    );
    result.doSuccess(1);

    result.data = {
      documents: queryResult,
    };
    result.data.limit = limit;
    result.data.page = skip / limit + 1;
    result.data.totalPage = Math.ceil(countTotalRow / limit);
    result.data.totalCount = countTotalRow;

    //totalCount
  } catch (e) {
    result.doError();
  }

  return result;
};

exports.getProductSerialByConditions = async (params, projection = {}) => {
  var result = new DataResponse();
  try {
    result.data = await InventoryProductSerialRequest.find(
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

exports.deleteProductSerialRequest = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerialRequest.deleteOne(params);
    result.data.deletedCount == 0
      ? result.doSuccess(3, "this _id isn't allowed to be removed!")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    result.doError();
  }

  return result;
};
