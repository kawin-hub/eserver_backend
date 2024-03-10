const SaleQuotation = require("./saleQuotations.schema");
const { DataResponse } = require("../../general_data.model");

// 👉 Get all

exports.getAllSaleQuotations = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await SaleQuotation.find(queryCondition, {
      _id: 1,
      createdAt: 1,
      documentNumber: 1,
      customerInfo: 1,
      quotationStatus: 1,
      currentStatus: 1,
      createdBy: 1,
    })
      .skip(skip)
      .limit(limit);

    result.doSuccess(1);

    var countTotalRow = await SaleQuotation.countDocuments(
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

exports.getSaleQuotationById = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleQuotation.findOne(params).lean();
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

exports.insertSaleQuotation = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleQuotation.create(params);
    result.data == null
      ? result.doSuccess(
          0,
          "Can't insert to database, please check your request!"
        )
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doError(6, "Quotation document number duplicate!")
      : result.doError();
  }

  return result;
};
