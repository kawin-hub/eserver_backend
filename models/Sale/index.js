const SaleLead = require("./lead/saleLeads.schema");
const { DataResponse } = require("../general_data.model");

// 👉 import module part
const lead = require("./lead/lead.model")

const insertSaleQuotation = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleLead.create(params);
    result.data == null
      ? result.doSuccess(0, "Can't insert to database, please check your request!")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doError(6, "Quptation document number duplicate!")
      : result.doError();
  }

  return result;
};

module.exports = {
  insertSaleQuotation,
  
  lead,
};