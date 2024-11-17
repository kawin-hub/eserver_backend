const InventoryRequest = require("./inventoryRequests.schema");
const { DataResponse } = require("../../general_data.model");
const { ObjectId } = require("mongodb");

// 👉 Get all

exports.getAllInventoryRequests = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;
    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await InventoryRequest.find(queryCondition, {
      _id: 1,
      createdAt: 1,
      dueDate: 1,
      documentNumber: 1,
      requestType: 1,
      currentStatus: 1,
      createdBy: 1,
    })
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .lean();

    result.doSuccess(1);

    var countTotalRow = await InventoryRequest.countDocuments(
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

exports.getAllInventoryRequestsByJob = async (params) => {
  var result = new DataResponse();
  try {
    const queryCondition = { currentStatus: "request" };

    result.data = await InventoryRequest.find(queryCondition, {
      _id: 1,
      createdAt: 1,
      dueDate: 1,
      documentNumber: 1,
      requestType: 1,
      currentStatus: 1,
    }).lean();

    result.doSuccess(1);

    //totalCount
  } catch (e) {
    result.doError();
  }
  return result;
};

// 👉 Get by ID

exports.getInventoryRequestById = async (params, projection = {}) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryRequest.findOne(params, projection).lean();
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

// 👉 Insert/Post

exports.insertInventoryRequest = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryRequest.create(params);
    result.data == null
      ? result.doSuccess(
          0,
          "Can't insert to database, please check your request!"
        )
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doError(6, "Request index duplicate!")
      : result.doError();
  }

  return result;
};

exports.getNewInventoryRequestId = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryRequest.findOne(
      params,
      { documentNumber: -1 },
      { sort: { _id: -1 } }
    );
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

exports.deleteInventoryRequest = async (data) => {
  var result = null;
  try {
    result = await InventoryRequest.findByIdAndDelete(data);
  } catch (e) {
    result = e;
  }

  return result;
};

exports.updateRequest = async (conditions, params, options = {}) => {
  var result = new DataResponse();
  try {
    result.data = await InventoryRequest.findOneAndUpdate(conditions, params, {
      ...options,
      new: true,
    });
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    result.doError(0);
  }
  return result;
};

exports.getRequestByConditions = async (params, projection = {}) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryRequest.find(params, projection).lean();
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
  console.log();
  return result;
};
