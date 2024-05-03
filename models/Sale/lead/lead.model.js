const SaleLead = require("./saleLeads.schema");
const CustomerLevel = require("./customerLevel.schema");
const LineLead = require("./leadLine.schema");
const { DataResponse } = require("../../general_data.model");
const { param } = require("express/lib/request");

async function initLead() {
  var result;

  const params = [
    {
      level: "end_user",
    },
    {
      level: "project",
    },
    {
      level: "dealer",
    },
  ];

  try {
    result = await CustomerLevel.create(params);
    result == null
      ? console.log("Can't insert to database, please check your request!")
      : console.log("CustomerLevel has been already Created.");
  } catch (e) {
    if (e.code == 11000) {
      console.log("CustomerLevel has been already created.");
    }
  }
}
initLead();

// 👉 Get all CustomerLevel

exports.getAllCustomerLevels = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await CustomerLevel.find(queryCondition, {
      _id: 1,
      level: 1,
    })
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .lean();

    result.doSuccess(1);

    var countTotalRow = await CustomerLevel.countDocuments(
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

// 👉 Get CustomerLevel by ID

exports.getCustomerLevelById = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await CustomerLevel.findOne(params).lean();
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

// 👉 Get all SaleLead

exports.getAllSaleLeads = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await SaleLead.find(queryCondition, params.projector)
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .lean();

    result.doSuccess(1);

    var countTotalRow = await SaleLead.countDocuments(params.queryCondition);
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
// 👉 Get SaleLead by ID

exports.getSaleLeadById = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleLead.findOne(params).lean();
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

// 👉 Insert/Post SaleLead
exports.insertSaleLead = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleLead.create(params);
    result.data == null
      ? result.doSuccess(
          0,
          "Can't insert to database, please check your request!"
        )
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
  }

  return result;
};

// 👉 Put/Update

exports.updateSaleLead = async (conditions, params) => {
  var result = new DataResponse();
  try {
    result.data = await SaleLead.updateOne(conditions, params);
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    result.doError(0);
  }

  return result;
};

// 👉 Delete

exports.deleteSaleLead = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleLead.deleteOne(params);
    result.data.deletedCount == 0
      ? result.doSuccess(3, "this _id isn't allowed to be removed!")
      : result.doSuccess(1);
  } catch (e) {
    result.doError();
  }

  return result;
};

// 👉 insert leadLine

exports.insertLineLead = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await LineLead.create(params);
    result.data == null
      ? result.doSuccess(
          0,
          "Can't insert to database, please check your request!"
        )
      : result.doSuccess(1);
  } catch (e) {
    if (e.code == 11000) console.log("This lineId is already exist!");
    else console.log(e);
  }

  return result;
};

// 👉 Get Line Users

exports.getLineUsersByConditions = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await LineLead.find(params).lean();
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
