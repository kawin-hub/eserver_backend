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

router.post("/quotations", verifyToken, saleQuotation.insertSaleQuotation);

// 👉 Sale Invoice

/* router.get("/invoices", verifyToken, saleInvoice.getSaleInvoices); */

router.post("/invoices", /* verifyToken, */ saleInvoice.insertSaleInvoice);
router.put("/invoices", verifyToken, saleInvoice.updateSaleInvoice);

module.exports = router;
