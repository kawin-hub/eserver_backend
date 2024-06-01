const { DataResponse } = require("../../general_data.model");
const SaleCertificate = require("./certificate.schema");

// 👉 Get all
exports.getAllCertificate = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await SaleCertificate.find(queryCondition, {
      _id: 1,
      customerName: 1,
      lead_id: 1,
      datePurcharse: 1,
      productService: 1,
      quotation_id: 1,
      quotationNumber: 1,
      warrantyPreriod: 1,
      createdBy: 1,
      pdfPath: 1,
      customerInfo: 1,
    })
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .lean();

    result.doSuccess(1);

    var countTotalRow = await SaleCertificate.countDocuments(
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

exports.getCertificateById = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleCertificate.findOne(params).lean();
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

exports.insertSaleCertificate = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleCertificate.create(params);
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

exports.deleteSaleCertificate = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleCertificate.deleteOne(params);
    result.data.deletedCount == 0
      ? result.doSuccess(3, "this _id isn't allowed to be removed!")
      : result.doSuccess(1);
  } catch (e) {
    result.doError();
  }

  return result;
};

exports.updateSaleCertificate = async (conditions, params, options = {}) => {
  var result = new DataResponse();
  try {
    result.data = await SaleCertificate.findOneAndUpdate(
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
