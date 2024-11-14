const InventoryRefunds = require("./inventoryRefund.schema");
const { DataResponse } = require("../../general_data.model");
const { Validator } = require("node-input-validator");
const { ObjectId } = require("mongodb");
const { status } = require("express/lib/response");

// get all

exports.getAllInventoryRefunds = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await InventoryRefunds.find(queryCondition, {
      documentNumber: 1,
      productModel: 1,
      inventoryRequest: 1,
      inventoryLocation: 1,
      status: 1,
      createdBy: 1,
      createdAt: 1,
      dueDate: 1,
    })
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .lean();
    result.doSuccess(1);

    var countTotalRow = await InventoryRefunds.countDocuments(
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
    console.log(e);
    result.doError(0);
  }
  return result;
};

exports.getAllInventoryRefundsByJob = async (params) => {
  var result = new DataResponse();
  try {
    var queryCondition = { status: "request" };

    result.data = await InventoryRefunds.find(queryCondition, {
      _id: 1,
      documentNumber: 1,
      status: 1,
      createdAt: 1,
      dueDate: 1,
    }).lean();
    result.doSuccess(1);

    //totalCount
  } catch (e) {
    console.log(e);
    result.doError(0);
  }
  return result;
};

exports.insertInventoryRefund = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryRefunds.create(params);
    result.data == null
      ? result.doSuccess(
          0,
          "Can't insert to database, please check your request!"
        )
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doSuccess(6, "Refund document number duplicate!")
      : result.doError();
  }

  return result;
};

exports.getNewInventoryRefundNumber = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryRefunds.findOne(
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

exports.getInventoryRefundById = async (params, projection = {}) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryRefunds.findOne(params, projection).lean();
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

exports.updateRefund = async (conditions, params, options = {}) => {
  var result = new DataResponse();
  try {
    result.data = await InventoryRefunds.findOneAndUpdate(conditions, params, {
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

/* function arrangeOrder(data = []) {
  return data.sort((a, b) => a.order - b.order);
}

var refund = [
  { name: "Kawin01", surname: "Sinwathanakasem01", type: "refund", order: 1 },
  { name: "Kawin02", surname: "Sinwathanakasem02", type: "refund", order: 3 },
  { name: "Kawin03", surname: "Sinwathanakasem03", type: "refund", order: 2 },
];

var request = [
  { name: "Kawin04", surname: "Sinwathanakasem04", type: "request", order: 2 },
  { name: "Kawin05", surname: "Sinwathanakasem05", type: "request", order: 1 },
  { name: "Kawin06", surname: "Sinwathanakasem06", type: "request", order: 5 },
];

var all = [...refund, ...request];

all = arrangeOrder(all);

console.log(all); */
