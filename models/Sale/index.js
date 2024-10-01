// 👉 import module part
const lead = require("./lead/lead.model");
const quotation = require("./quotation/quotation.model");
const invoice = require("./invoice/invoice.model");
const certificate = require("./certificate/certificate.model");
const receipt = require("./receipt/receipt.model");

module.exports = {
  lead,
  quotation,
  invoice,
  certificate,
  receipt,
};
