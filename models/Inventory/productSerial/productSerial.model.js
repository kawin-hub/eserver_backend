const InventoryProductSerial = require("./inventoryProductSerial.schema");
const { DataResponse } = require("../../general_data.model");
const ProductSerial = require("./inventoryProductSerial.schema");
const { ObjectId } = require("mongodb");
const ProductModel = require("../../Products/productModels.schema");

// 👉 Insert/Post

exports.insertProductSerial = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerial.create(params);
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

exports.getAllProductSerial = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;
    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await InventoryProductSerial.find(queryCondition, {
      _id: 1,
      lot_id: 1,
      accountExpense: 1,
      productModel: 1,
      inventoryLocation: 1,
      recieveDate: 1,
      serialNumber: 1,
      currentStatus: 1,
      movements: 1,
      createdBy: 1,
      updatedBy: 1,
    })
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .lean();

    result.doSuccess(1);

    var countTotalRow = await InventoryProductSerial.countDocuments(
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

// 👉 Get by Array ID

exports.getProductSerialsbyArrayId = async (
  inventoryProductSerial_ids,
  projection = {}
) => {
  var result = new DataResponse();
  try {
    result.data = await InventoryProductSerial.find(
      { _id: { $in: inventoryProductSerial_ids } },
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

exports.getTotalProductSerailsByProductIds = async (productIds) => {
  var result = new DataResponse();
  try {
    result.data = await InventoryProductSerial.aggregate([
      {
        $match: {
          "productModel.productModel_id": {
            $in: productIds,
          },
          currentStatus: "in stock",
          active: true,
        },
      },
      {
        $group: {
          _id: "$productModel.productModel_id",
          count: { $sum: 1 },
        },
      },
    ]);

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

exports.getProductSerialsbyParams = async (param) => {
  var result = new DataResponse();
  try {
    result.data = await ProductSerial.findOne(param).lean();
    result.data == null
      ? result.doSuccess(2, "Not found in database")
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

// 👉 Delete

exports.deleteOneProductSerial = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerial.findByIdAndDelete(params);
    result.data.deletedCount == 0
      ? result.doSuccess(3, "this _id isn't allowed to be removed!")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    result.doError();
  }

  return result;
};

exports.updateInventoryProductSerail = async (filter, update) => {
  var result = new DataResponse();
  try {
    result.data = await ProductSerial.updateMany(filter, update);
  } catch (e) {
    console.log(e);
    result.doError(0);
  }

  return result;
};

exports.updateInventoryProductSerailByLotId = async (conditions, params) => {
  var result = new DataResponse();
  try {
    result.data = await ProductSerial.updateMany(conditions, params);
    if (result.data.acknowledged) {
      result.data = {
        acknowledged: true,
        updated: result.data.modifiedCount,
      };
      result.doSuccess(1);
    } else {
      result.doSuccess(2, "_id not found in database");
    }
  } catch (e) {
    console.log(e);
    result.doError(0);
  }
  console.log(result);
  return result;
};

exports.updateInventoryProductSerailNumber = async (
  conditions,
  params,
  options = {}
) => {
  var result = new DataResponse();
  try {
    result.data = await ProductSerial.findOneAndUpdate(conditions, params, {
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

exports.updateInventoryProductSerailByArrayId = async (
  productSerial_ids,
  params
) => {
  var result = new DataResponse();
  try {
    result.data = await ProductSerial.updateMany(
      { _id: { $in: productSerial_ids } }, // Match documents where _id is in the idsArray
      params
    );
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
  }
  return result;
};

exports.getProductSerialByConditions = async (
  params,
  projection = {},
  sort = {}
) => {
  var result = new DataResponse();

  try {
    result.data = await ProductSerial.find(params, projection, sort).lean();
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

exports.getInventoryProductTotal = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;
    result.data = await InventoryProductSerial.aggregate([
      {
        $match: {
          ...params.match,
          ...params.queryCondition, // Merge the query condition here
        },
      },
      {
        $group: {
          _id: {
            productModel_id: "$productModel.productModel_id",
            location_id: "$inventoryLocation.location_id",
          },
          count: { $sum: 1 },
          modelCode: { $first: "$productModel.modelCode" },
          name: { $first: "$productModel.name" },
          inventoryLocation: {
            $first: {
              location_id: "$inventoryLocation.location_id",
              name: "$inventoryLocation.name",
            },
          },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    var countTotalRowAggregation = await InventoryProductSerial.aggregate([
      {
        $match: {
          ...params.match,
          ...params.queryCondition, // Merge the query condition here
        },
      },
      {
        $group: {
          _id: {
            productModel_id: "$productModel.productModel_id",
            location_id: "$inventoryLocation.location_id",
          },
        },
      },
      {
        $count: "totalCount",
      },
    ]);

    const countTotalRow = countTotalRowAggregation[0]?.totalCount || 0;
    result.doSuccess(1);

    result.doSuccess(1);

    result.data = {
      documents: result.data,
    };
    result.data.limit = limit;
    result.data.page = skip / limit + 1;
    result.data.totalPage = Math.ceil(countTotalRow / limit);
    result.data.totalCount = countTotalRow;
  } catch (e) {
    console.log(e);
    result.doError(0);
  }
  return result;
};

exports.getInsertedProductSerial = async (match) => {
  var result = new DataResponse();

  try {
    result.data = await InventoryProductSerial.aggregate([
      {
        $match: match,
      },
      {
        $group: {
          _id: "$productModel.productModel_id",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          productModel_id: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
    // ใส่ code ส่วนที่เหลือเอาเองนะอูม
  } catch (error) {
    console.log(error);
    result.doError(0);
  }

  return result;
};

exports.getProductSerialByMove = async (location_id) => {
  var result = new DataResponse();
  try {
    result.data = await InventoryProductSerial.aggregate([
      {
        $match: {
          "inventoryLocation.location_id": new ObjectId(location_id),
          currentStatus: "in stock",
        },
      },
      {
        $group: {
          _id: "$productModel.productModel_id",
          productDetails: { $first: "$productModel" },
          totalInStock: { $sum: 1 },
          serialNumbers: { $push: "$serialNumber" },
          locations: { $addToSet: "$inventoryLocation" },
        },
      },
      {
        $project: {
          _id: 0,
          productModel: "$productDetails",
          totalInStock: 1,
          serialNumbers: 1,
          locations: 1,
        },
      },
    ]);
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (error) {
    console.log(error);
    result.doError(0);
  }
  return result;
};
