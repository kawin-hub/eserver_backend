let dotenv = require("dotenv");

// 👉 import module part
const saleLead = require("./saleLead.controller");
const saleQuotation = require("./saleQuotation.controller");
const saleInvoice = require("./saleInvoice.controller");
const saleReceipt = require("./saleReceipt.controller");

dotenv.config();

module.exports = {
  saleLead,
  saleQuotation,
  saleInvoice,
  saleReceipt,
};
