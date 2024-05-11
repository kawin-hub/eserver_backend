const SaleReceipt = require("./saleReceipt.schema");
const { DataResponse } = require("../../general_data.model");

exports.insertSaleReCeipt = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleReceipt.create(params);
    result.data == null
      ? result.doSuccess(
          0,
          "Can't insert to database, please check your request!"
        )
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doError(6, "Tax document number duplicate!")
      : result.doError();
  }

  return result;
};

// 👉 Get by ID

exports.getLastestSaleReceiptId = async () => {
  var result = new DataResponse();

  try {
    result.data = await SaleReceipt.findOne(
      {},
      { documentNumber: -1 },
      { sort: { _id: -1 } }
    );
    result.data == null
      ? result.doSuccess(2, "This collection is null!")
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

exports.getSaleReceiptByConditions = async (params, projection = {}) => {
  var result = new DataResponse();
  console.log("In model");
  try {
    result.data = await SaleReceipt.find(params, projection).lean();
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

exports.getAllSaleInvoices = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await SaleReceipt.find(queryCondition)
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .lean();

    result.doSuccess(1);

    var countTotalRow = await SaleReceipt.countDocuments(params.queryCondition);
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

exports.getSaleReceiptByConditions = async (params, projection = {}) => {
  var result = new DataResponse();

  try {
    result.data = await SaleReceipt.find(params, projection).lean();
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

exports.updateSaleReceipt = async (conditions, params, options = {}) => {
  var result = new DataResponse();
  try {
    result.data = await SaleReceipt.findOneAndUpdate(
      conditions,
      params,
      options
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
