const InventoryLocation = require("./inventoryLocations.schema");
const InventoryLot = require("./inventoryLots.schema");
const InventoryMove = require("./inventoryMoves.schema");
const InventoryBorrow = require("./inventoryBorrows.schema")
const { DataResponse } = require("../general_data.model");

// Inventory Location
const getAllInventoryLocations = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await InventoryLocation.find(queryCondition, {
      _id: 1,
      name: 1,
      adminName: 1,
      contactNumber: 1,
      address: 1,
      status: 1,
    })
      .skip(skip)
      .limit(limit);

    result.doSuccess(1);

    var countTotalRow = await InventoryLocation.countDocuments(
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

const getInventoryLocationById = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryLocation.findOne(params).lean();
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

const insertInventoryLocation = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryLocation.create(params);
    result.data == null
      ? result.doSuccess(0, "Can't insert to database, please check your request!")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doError(6, "Lot index duplicate!")
      : result.doError();
  }

  return result;
};

const updateInventoryLocation = async (_id, update) => {
  var location = null;

  try {
    location = await InventoryLocation.findByIdAndUpdate(_id, update);
  } catch (e) {
    location = e;
  }

  return location;
};

const deleteInventoryLocation = async (data) => {
  var result = null;
  try {
    result = await InventoryLocation.findByIdAndRemove(data);
  } catch (e) {
    result = e;
  }

  return result;
};

const getInventoryLocationbyArrayId = async (location_ids) => {
  var result = new DataResponse();
  try {
    result.data = await InventoryLocation.find(
      { _id: { $in: location_ids } },
      { _id: 1, modelCode: 1, name: 1 }
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

//Inventory Lot

const getALLInventoryLots = async (params) => {
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
      expense: 1,
      status: 1,
    })
      .skip(skip)
      .limit(limit);

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

const getInventoryLotById = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryLot.findOne(params).lean();
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

const insertInventoryLot = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryLot.create(params);
    result.data == null
      ? result.doSuccess(0, "Can't insert to database, please check your request!")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doError(6, "Lot document number duplicate!")
      : result.doError();
  }

  return result;
};

const deleteInventoryLot = async (data) => {
  var result = null;
  try {
    result = await InventoryLot.findByIdAndRemove(data);
  } catch (e) {
    result = e;
  }

  return result;
};

//Inventory Move

const getAllInventoryMoves = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await InventoryMove.find(queryCondition, {
      _id: 1,
      createdAt: 1,
      dueDate:1,
      documentNumber: 1,
      location: 1,
    })
      .skip(skip)
      .limit(limit);

    result.doSuccess(1);

    var countTotalRow = await InventoryMove.countDocuments(
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

const insertInventoryMove = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryMove.create(params);
    result.data == null
      ? result.doSuccess(0, "Can't insert to database, please check your request!")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doError(6, "Move index duplicate!")
      : result.doError();
  }

  return result;
};

const getInventoryMoveById = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryMove.findOne(params).lean();
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

//Inventory Borrow

const getAllInventoryBorrows = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await InventoryBorrow.find(queryCondition, {
      _id: 1,
      createdAt: 1,
      dueDate: 1,
      documentNumber: 1,
      purpose: 1,
      mainStatus: 1,
    })
      .skip(skip)
      .limit(limit);

    result.doSuccess(1);

    var countTotalRow = await InventoryBorrow.countDocuments(
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

const insertInventoryBorrow = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryBorrow.create(params);
    result.data == null
      ? result.doSuccess(0, "Can't insert to database, please check your request!")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doError(6, "Borrow index duplicate!")
      : result.doError();
  }

  return result;
};

const getInventoryBorrowById = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryBorrow.findOne(params).lean();
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

//Inventory Refund

const insertInventoryRefund = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryRefund.create(params);
    result.data == null
      ? result.doSuccess(0, "Can't insert to database, please check your request!")
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
  getAllInventoryLocations,
  insertInventoryLocation,
  getInventoryLocationbyArrayId,
  getALLInventoryLots,
  getInventoryLotById,
  insertInventoryLot,
  deleteInventoryLot,
  deleteInventoryLocation,
  updateInventoryLocation,
  getInventoryLocationById,
  getAllInventoryMoves,
  insertInventoryMove,
  getInventoryMoveById,
  getAllInventoryBorrows,
  getInventoryBorrowById,
  insertInventoryBorrow,
  insertInventoryRefund,
};
