const { DataResponse } = require("../../models/general_data.model");
let { general, upload } = require("../../middleware");
const { Validator } = require("node-input-validator");
const SaleController = require("../sale");
const AccountController = require("../account");

const dotenv = require("dotenv");
dotenv.config();

exports.getTransetions = async (req, res) => {
  var result = new DataResponse();

  try {
    var { sales, revenues, expenses, newCustomers, startDate, endDate } =
      req.query;

    if (typeof startDate === "undefined") {
      var beginDate = new Date();
      beginDate.setDate(1);
      startDate = general.formatDate(beginDate);
    }

    if (typeof endDate === "undefined") {
      endDate = general.formatDate(new Date());
    }

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    result.data = {};

    var functionToDo = [];

    if (typeof sales !== "undefined") {
      functionToDo[functionToDo.length] = getSales({ startDate, endDate });
    }
    if (typeof revenues !== "undefined") {
      functionToDo[functionToDo.length] = getRevenues({ startDate, endDate });
    }
    if (typeof expenses !== "undefined") {
      functionToDo[functionToDo.length] = getExpenses({ startDate, endDate });
    }
    if (typeof newCustomers !== "undefined") {
      functionToDo[functionToDo.length] = getNewCustomers({
        startDate,
        endDate,
      });
    }

    var myResult = await Promise.all(functionToDo);

    myResult = myResult.reduce((acc, obj) => {
      return { ...acc, ...obj };
    });

    result.data = myResult;

    result.doSuccess();
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

async function getSales(queryDate) {
  var result = new DataResponse();

  try {
    result =
      await SaleController.saleQuotation.getSaleQuotationTotalByConditions({
        currentStatus: "purchased",
      });
  } catch (error) {
    console.log(error);
  }

  return result;
}

async function getRevenues(queryDate) {
  var result = new DataResponse();

  try {
    result = await SaleController.saleInvoice.getSaleInvoiceTotalByConditions({
      paymentStatus: "paid",
      paidDate: {
        $gte: queryDate.startDate,
        $lt: queryDate.endDate,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return result;
}

async function getExpenses(queryDate) {
  var result = new DataResponse();

  try {
    result =
      await AccountController.accountExpense.getExpensesTotalByConditions({
        expenseDate: {
          $gte: queryDate.startDate,
          $lt: queryDate.endDate,
        },
      });
  } catch (error) {
    console.log(error);
  }

  return result;
}

async function getNewCustomers(queryDate) {
  var result = new DataResponse();

  try {
    result = await SaleController.saleLead.getNewCustomerCountByConditions({
      createdAt: {
        $gte: queryDate.startDate,
        $lt: queryDate.endDate,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return result;
}
