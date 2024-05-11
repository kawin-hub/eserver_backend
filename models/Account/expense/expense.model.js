const AccountExpense = require("./accountExpenses.schema");
const { DataResponse } = require("../../general_data.model");



exports.getAllAccountExpenses = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await AccountExpense.find(queryCondition, {
      _id: 1,
      expenseDate: 1,
      documentNumber: 1,
      whom: 1,
      category: 1,
      amount: 1,
      type: 1,
      createdBy: 1,
    })
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .lean();

    result.doSuccess(1);

    var countTotalRow = await AccountExpense.countDocuments(
      params.queryCondition
    );
    result.doSuccess(1);

    result.data = {
      documents: queryResult,
    };
    result.data.limit = limit;
    result.data.page = skip / limit + 1;
    result.data.totalPage = Math.ceil(countTotalRow / limit);
    result.data.totalCount = countTotalRow;

    //totalCount
  } catch (e) {
    result.doError();
  }

  return result;
};

// 👉 Get by ID

exports.getAccountExpenseById = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await AccountExpense.findOne(params).lean();
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e.kind);
    if (e.kind == "ObjectId") {
      result.doError(0, "Please check your _id format");
    } else {
      result.doError(0);
    }
  }

  return result;
};

// 👉 Insert/Post

exports.insertAccountExpense = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await AccountExpense.create(params);
    result.data == null
      ? result.doSuccess(
          0,
          "Can't insert to database, please check your request!"
        )
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doError(6, "Expense document number duplicate!")
      : result.doError();
  }

  return result;
};

exports.updateAccountExpense = async (params, conditions) => {
  var result = new DataResponse();

  try {
    result.data = await AccountExpense.updateOne(params, conditions);

    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    result.doError(0);
  }

  return result;
};

exports.deleteAccountExpense = async (params) => {
  var result = new DataResponse();

  console.log(" in model");
  try {
    result.data = await AccountExpense.deleteOne(params);
    console.log(result.data);
    result.data.deletedCount == 0
      ? result.doSuccess(3, "this _id isn't allowed to be removed!")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    result.doError();
  }
  console.log(result);
  return result;
};

exports.getNewAccountExpenseId = async () => {
  var result = new DataResponse();

  try {
    result.data = await AccountExpense.findOne(
      {},
      { documentNumber: -1 },
      { sort: { _id: -1 } }
    );
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e.kind);
    if (e.kind == "ObjectId") {
      result.doError(0, "Please check your _id format");
    } else {
      result.doError(0);
    }
  }

  return result;
};
