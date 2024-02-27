const SaleLead = require("./saleLeads.schema");
const { DataResponse } = require("../../general_data.model");

// 👉 Get all

exports.getAllSaleLeads = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await SaleLead.find(queryCondition, {
      _id: 1,
      createdAt: 1,
      companyName: 1,
      leadFirstname: 1,
      leadContactNumber: 1,
      leadLevel: 1,
    })
      .skip(skip)
      .limit(limit);

    result.doSuccess(1);

    var countTotalRow = await SaleLead.countDocuments(
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

// 👉 Insert/Post

exports.insertSaleLead = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleLead.create(params);
    result.data == null
      ? result.doSuccess(0, "Can't insert to database, please check your request!")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
  }

  return result;
};