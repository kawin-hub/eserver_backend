const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware"));
//const multer = require("multer");
//const upload = multer({ dest: "./assets/images/product/brands/" });

const {
  saleLead,
  saleQuotation,
  saleInvoice,
  saleCertificate,
  saleReceipt,
} = require("../controllers/sale");

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
router.get("/quotations/count", verifyToken, saleQuotation.getQuotationCount);
router.get(
  "/quotations/request",
  verifyToken,
  saleQuotation.getProductsQuotationByRequest
);
router.get(
  "/quotations/getSaleQuotationsAndProductInfo",
  verifyToken,
  saleQuotation.getSaleQuotationsAndProductInfo
);
router.put("/quotations", verifyToken, saleQuotation.updateSaleQuotation);
router.post("/quotations", verifyToken, saleQuotation.insertSaleQuotation);
router.delete("/quotations", verifyToken, saleQuotation.deleteSaleQuotation);

// 👉 Sale Invoice

router.get("/invoices", verifyToken, saleInvoice.getSaleInvoices);

router.get("/invoices/newInvoiceId", verifyToken, saleInvoice.getNewInvoiceId);
router.get(
  "/invoices/invoiceNumber",
  verifyToken,
  saleInvoice.getInvoicesByInvoiceNumber
);
router.get(
  "/invoices/paymentStatus",
  verifyToken,
  saleInvoice.getInvoicesByPaymentStatus
);
router.get("/invoices/count", verifyToken, saleInvoice.getInvoiceCount);
router.post("/invoices", verifyToken, saleInvoice.insertSaleInvoice);
router.put("/invoices", verifyToken, saleInvoice.updateSaleInvoice);
router.put(
  "/invoices/changeStatus",
  verifyToken,
  saleInvoice.updatePaymentStatus
);
router.delete("/invoices", verifyToken, saleInvoice.deleteInvoice);

// 👉 Sale Receipt

router.get("/receipt", verifyToken, saleReceipt.getSaleReceipts);
router.put("/receipt", verifyToken, saleReceipt.updateReceipt);
router.delete("/receipt", verifyToken, saleReceipt.deleteReceipt);

// 👉 Line

router.post("/line/webhook", saleLead.lineWebHook);

router.get("/line/users", verifyToken, saleLead.getLineUsers);
router.get("/line/profile", verifyToken, saleLead.getLineUserFromLineDeveloper);
router.post(
  "/line/sendQuotation",
  verifyToken,
  saleQuotation.sendQuotationToLine
);
router.post("/line/sendInvoice", verifyToken, saleInvoice.sendInvoiceToLine);

// 👉 Sale Certificate
router.get("/certificate", verifyToken, saleCertificate.getSaleCertificate);
router.post("/certificate", verifyToken, saleCertificate.insertSaleCertificate);
router.delete("/certificate", verifyToken, saleCertificate.deleteCertificate);
router.put("/certificate", verifyToken, saleCertificate.updateCertificate);

module.exports = router;
