const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware"));
//const multer = require("multer");
//const upload = multer({ dest: "./assets/images/product/brands/" });

const { saleLead, saleQuotation, saleInvoice } = require("../controllers/sale");

// 👉 Sale Lead

router.get("/leads", verifyToken, saleLead.getSaleLeads);
router.put("/leads", verifyToken, saleLead.updateSaleLead);
router.delete("/leads", verifyToken, saleLead.deleteSaleLead);
router.get("/customerLevels", saleLead.getCustomerLevels);
router.post("/leads", verifyToken, saleLead.insertSaleLead);

// 👉 Sale Quotation

router.get("/quotations", verifyToken, saleQuotation.getSaleQuotations);
router.get(
  "/quotations/newQuatationId",
  verifyToken,
  saleQuotation.getNewQuationId
);
router.put("/quotations", verifyToken, saleQuotation.updateSaleQuotation);
router.post("/quotations", verifyToken, saleQuotation.insertSaleQuotation);
router.delete("/quotations", verifyToken, saleQuotation.deleteSaleQuotation);

// 👉 Sale Invoice

router.get("/invoices", verifyToken, saleInvoice.getSaleInvoices);
router.get("/invoices/newInvoiceId", verifyToken, saleInvoice.getNewInvoiceId);
router.post("/invoices", verifyToken, saleInvoice.insertSaleInvoice);
router.put("/invoices", verifyToken, saleInvoice.updateSaleInvoice);
router.delete("/invoices", verifyToken, saleInvoice.deleteInvoice);

// 👉 Line

router.post("/line/webhook", saleLead.lineWebHook);

router.get("/line/users", verifyToken, saleLead.getLineUsers);
router.get("/line/profile", verifyToken, saleLead.getLineUserFromLineDeveloper);
router.post(
  "/line/sendQuotation",
  verifyToken,
  saleQuotation.sendQuotationToLine
);

module.exports = router;
