const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware"));
//const multer = require("multer");
//const upload = multer({ dest: "./assets/images/product/brands/" });

const {
    saleLead
} = require("../controllers/sale");

// 👉 Sale Lead

router.get("/leads", saleLead.getSaleLeads);

router.post("/leads", saleLead.insertSaleLead);

module.exports = router;
