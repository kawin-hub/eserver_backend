const SaleQuotation = require("./saleQuotations.schema");
const SaleInvoice = require("../invoice/saleInvoice.schema");
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
    const queryResult = await SaleQuotation.aggregate([
      {
        $match: queryCondition,
      },
      {
        $lookup: {
          from: "SaleInvoices",
          localField: "_id",
          foreignField: "quotation_id",
          as: "invoice",
        },
      },
      {
        $addFields: {
          purchased: {
            $cond: {
              if: { $gt: [{ $size: "$invoice" }, 0] },
              then: 1,
              else: 0,
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          documentNumber: 1,
          customerInfo: 1,
          quotationStatus: 1,
          currentStatus: 1,
          createdBy: 1,
          summary: 1,
          purchased: 1,
        },
      },
      {
        $sort: { _id: -1 }, // Sort by issuedDate in descending order
      },
      {
        $skip: skip, // Skip first n documents
      },
      {
        $limit: limit, // Limit to n documents
      },
    ]);

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

// 👉 Put/Update

exports.updateSaleQuotation = async (conditions, params) => {
  var result = new DataResponse();
  try {
    result.data = await SaleQuotation.updateOne(conditions, params);
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

exports.deleteSaleQuotation = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleQuotation.deleteOne(params);
    result.data.deletedCount == 0
      ? result.doSuccess(3, "this _id isn't allowed to be removed!")
      : result.doSuccess(1);
  } catch (e) {
    result.doError();
  }

  return result;
};
