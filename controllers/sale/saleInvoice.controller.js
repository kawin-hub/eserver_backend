//Quotation model
let SaleModel = require("../../models/Sale");
let ProductModel = require("../../models/Products");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Insert/Post

exports.insertSaleInvoice = async (req, res) => {
  var result = new DataResponse();

  try {
    /* const validation = new Validator(req.body,{
    documentNumber: "required",
    issuedDate: "required|dateFormat:YYYY-MM-DD",
    dueDate: "required|dateFormat:YYYY-MM-DD",
    amountRecieved: "required",
    customerType: "required",
    projectType: "required",
    saleQuotation_id: "required",

}); */

    var params = {
        documentNumber: documentNumber,
        products: products,
        
    };
  } catch (error) {
    console.log(error);
  }
  res.json(result);
};
