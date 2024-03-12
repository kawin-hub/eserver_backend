const InventoryLot = require("./inventoryLots.schema");
const { DataResponse } = require("../../general_data.model");

// 👉 Get all

exports.getALLInventoryLots = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await InventoryLot.find(queryCondition, {
      _id: 1,
      estimatedDate: 1,
      lotNumber: 1,
      accountExpense: 1,
      currentStatus: 1,
      status: 1,
      createdBy: 1,
    })
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .lean();

    result.doSuccess(1);

    var countTotalRow = await InventoryLot.countDocuments(
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

// 👉 Get by ID

exports.getInventoryLotById = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryLot.findOne(params).lean();
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    if (e.kind == "ObjectId") {
      result.doError(0, "Please check your _id format");
    } else {
      result.doError(0);
    }
  }

  return result;
};

// 👉 Insert/Post

exports.insertInventoryLot = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryLot.create(params);
    result.data == null
      ? result.doSuccess(
          0,
          "Can't insert to database, please check your request!"
        )
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doError(6, "Lot document number duplicate!")
      : result.doError();
  }

  return result;
};

// 👉 Delete

exports.deleteInventoryLot = async (data) => {
  var result = null;
  try {
    result = await InventoryLot.findByIdAndRemove(data);
  } catch (e) {
    result = e;
  }

  return result;
};

// 👉 Update/Put

exports.updateOneInventoryLot = async (conditions, params) => {
  var result = new DataResponse();
  try {
    if (conditions != {}) {
      result.data = await InventoryLot.updateOne(conditions, params);
      result.data == null
        ? result.doSuccess(2, "_id not found in database")
        : result.doSuccess(1);
    }
  } catch (e) {
    console.log(e);
    result.doError(0);
  }

  return result;
};
