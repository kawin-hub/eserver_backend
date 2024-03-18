//account model
let AccountModel = require("../../models/Account");
let { upload, general } = require("../../middleware");
const fs = require("fs");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Get all or by ID

exports.getAccountExpenses = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id } = req.query;

    var AccountExpenseModel = AccountModel.expense;

    if (typeof _id != "undefined") {
      result = await AccountExpenseModel.getAccountExpenseById({
        _id: new Object(_id),
      });
    } else {
      var pageOption = general.checkPageAndLimit(
        req.query.page,
        req.query.limit
      );

      var params = {
        page: pageOption.page,
        limit: pageOption.limit,
        queryCondition: {},
      };

      result = await AccountExpenseModel.getAllAccountExpenses(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

// 👉 Post/Insert

exports.insertAccountExpense = async (req, res) => {
  var result = new DataResponse();

  try {
    var imagesName = "images";
    var docsName = "documents";

    var resUpload = await upload.uploadFiles(req, res, [
      {
        name: imagesName,
        path: "./assets/images/account/expenses",
        maxCount: 5,
        allowType: ["jpeg", "jpg", "png"],
      },
      {
        name: docsName,
        path: "./assets/documents/account/expenses",
        maxCount: 5,
        allowType: ["pdf"],
      },
    ]);

    if (resUpload.success) {
      const validation = new Validator(req.body, {
        documentNumber: "required",
        expenseDate: "required|dateFormat:YYYY-MM-DD",
        category: "required|in:stock,nonstock",
        amount: "required",
        whom: "required",
      });

      const matched = await validation.check();

      var AccountExpenseModel = AccountModel.expense;

      if (matched) {
        const {
          documentNumber,
          expenseDate,
          category,
          type,
          amount,
          whom,
          tag,
          remark,
        } = req.body;

        const userData = req.body.authData.userInfo.userData;

        var images = [];
        var documents = [];

        for (let i = 0; i < req.files[imagesName]?.length; i++) {
          images[i] = {
            name: req.files[imagesName][i].originalname,
            path: req.files[imagesName][i].path,
          };
        }

        for (let i = 0; i < req.files[docsName]?.length; i++) {
          documents[i] = {
            name: req.files[docsName][i].originalname,
            path: req.files[docsName][i].path,
          };
        }
        var params = {
          documentNumber: documentNumber,
          expenseDate: expenseDate,
          category: typeof category != "undefined" ? category : "",
          type: type,
          amount: amount,
          whom: whom,
          tag: typeof tag != "undefined" ? tag : "",
          remark: typeof remark != "undefined" ? remark : "",
          images: images,
          documents: documents,
          createdBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        };
        result = await AccountExpenseModel.insertAccountExpense(params);
      } else {
        result.doError(2, validation.errors);
      }
    } else {
      result.doError(7, "Files or images are wrong format, please check!");
    }
  } catch (error) {
    console.log(error);
  }

  if (result.code != 1) {
    for (let i = 0; i < req.files[imagesName]?.length; i++) {
      fs.rmSync(req.files[imagesName][i].path, {
        force: true,
      });
    }
    for (let i = 0; i < req.files[docsName]?.length; i++) {
      fs.rmSync(req.files[docsName][i].path, {
        force: true,
      });
    }
  }

  res.json(result);
};
