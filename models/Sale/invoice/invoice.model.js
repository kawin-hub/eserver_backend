const SaleInvoice = require("./saleInvoice.schema");
const { DataResponse } = require("../../general_data.model");

// 👉 Get all

exports.getAllSaleInvoices = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await SaleInvoice.find(queryCondition, {
      _id: 1,
      documentNumber: 1,
      issuedDate: 1,
      dueDate: 1,
      amountRecieved: 1,
      paymentStatus: 1,
      customerInfo: 1,
      convertInfo: 1,
      quotation_id: 1,
      createdBy: 1,
      pdfPath: 1,
      pdfTaxPath: 1,
    })
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .lean();

    result.doSuccess(1);

    var countTotalRow = await SaleInvoice.countDocuments(params.queryCondition);
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

exports.getSaleInvoiceByConditions = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleInvoice.findOne(params).lean();
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

exports.getNewSaleInvoiceId = async () => {
  var result = new DataResponse();

  try {
    result.data = await SaleInvoice.findOne(
      {},
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

// 👉 Insert/Post

exports.insertSaleInvoice = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleInvoice.create(params);
    result.data == null
      ? result.doSuccess(
          0,
          "Can't insert to database, please check your request!"
        )
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doError(6, "Invoice document number duplicate!")
      : result.doError();
  }

  return result;
};

// 👉 Get by Conditions (คล้าย by ID แต่ไปเลือกค่าได้ที่หน้า controller)

exports.getSaleInvoiceByConditions = async (params, projection = {}) => {
  var result = new DataResponse();

  try {
    result.data = await SaleInvoice.find(params, projection).lean();
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

// 👉 Put/Update

exports.updateInvoice = async (conditions, params, options = {}) => {
  var result = new DataResponse();
  try {
    result.data = await SaleInvoice.findOneAndUpdate(
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

// 👉 Delete

exports.deleteSaleInvoice = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleInvoice.deleteOne(params);
    result.data.deletedCount == 0
      ? result.doSuccess(3, "this _id isn't allowed to be removed!")
      : result.doSuccess(1);
  } catch (e) {
    result.doError();
  }

  return result;
};
