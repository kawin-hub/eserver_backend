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