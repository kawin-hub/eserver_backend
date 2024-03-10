const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware"));
//const multer = require("multer");
//const upload = multer({ dest: "./assets/images/product/brands/" });

const {
    accountExpense
} = require("../controllers/account");

// 👉 Account Expense

router.get("/expenses", verifyToken, accountExpense.getAccountExpenses);

router.post("/expenses", verifyToken, accountExpense.insertAccountExpense);

module.exports = router;
