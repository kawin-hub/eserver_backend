const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware"));
//const multer = require("multer");
//const upload = multer({ dest: "./assets/images/product/brands/" });

const {
    saleLead,
    saleQuotation,
    saleInvoice,
} = require("../controllers/sale");

// 👉 Sale Lead

router.get("/leads", verifyToken, saleLead.getSaleLeads);

router.post("/leads", verifyToken, saleLead.insertSaleLead);

// 👉 Sale Quotation

router.get("/quotations", verifyToken, saleQuotation.getSaleQuotations);

router.post("/quotations", verifyToken, saleQuotation.insertSaleQuotation);

// 👉 Sale Invoice

/* router.get("/invoices", verifyToken, saleInvoice.getSaleInvoices); */

router.post("/invoices", /* verifyToken, */ saleInvoice.insertSaleInvoice);

module.exports = router;
