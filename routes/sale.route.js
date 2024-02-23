const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware"));
//const multer = require("multer");
//const upload = multer({ dest: "./assets/images/product/brands/" });

const {
    getSaleLeads,
    insertSaleLead,
} = require("../controllers/sale.controller");

// Sale Lead

router.get("/leads", getSaleLeads);

router.post("/leads", insertSaleLead);

module.exports = router;
