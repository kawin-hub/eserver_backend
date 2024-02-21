const AccountExpense = require("./accountExpenses.schema");
const { DataResponse } = require("../general_data.model");

//Account Expense
  
  const insertAccountExpense = async (params) => {
    var result = new DataResponse();
  
    try {
      result.data = await AccountExpense.create(params);
      result.data == null
        ? result.doSuccess(0, "Can't insert to database, please check your request!")
        : result.doSuccess(1);
    } catch (e) {
      console.log(e);
      e.code == 11000
        ? result.doError(6, "Expense document number duplicate!")
        : result.doError();
    }
  
    return result;
  };

  module.exports = {
    insertAccountExpense,
  };