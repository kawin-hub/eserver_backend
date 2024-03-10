const SaleInvoice = require("./saleInvoice.schema");
const { DataResponse } = require("../../general_data.model");

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

exports.getSaleQuotationByConditions = async (params, projector = {}) => {
  var result = new DataResponse();

  try {
    result.data = await SaleInvoice.find(params, projector).lean();
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
