const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware"));
//const multer = require("multer");
//const upload = multer({ dest: "./assets/images/product/brands/" });

const {
    getAccountExpenses,
    insertAccountExpense,
} = require("../controllers/account.controller");

// Account Expense

router.get("/expenses", getAccountExpenses);

router.post("/expense", insertAccountExpense);

module.exports = router;
