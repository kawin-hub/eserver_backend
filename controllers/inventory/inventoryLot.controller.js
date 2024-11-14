// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let AccountModel = require("../../models/Account");
let ProductModel = require("../../models/Products");
let { upload, general } = require("../../middleware");
const fs = require("fs");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { type } = require("express/lib/response");
const { ObjectId } = require("mongodb");

// 👉 Get all or by ID

exports.getInventoryLots = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id, txtSearch, lotStatus, type } = req.query;

    var InventoryLotModel = InventoryModel.lot;
    var productSerialModel = InventoryModel.productSerial;
    if (typeof _id != "undefined") {
      result = await InventoryLotModel.getInventoryLotById({
        _id: new Object(_id),
      });

      if (result.code == 1) {
        var serialAmount = await productSerialModel.getInsertedProductSerial({
          lot_id: new ObjectId(_id),
        });
      }

      for (var i = 0; i < serialAmount.data.length; i++) {
        for (var k = 0; k < result.data.productModel.length; k++) {
          if (
            result.data.productModel[k]._id.equals(
              serialAmount.data[i].productModel_id
            )
          ) {
            result.data.productModel[k].inserted = serialAmount.data[i].count;
            break;
          }
        }
      }
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

      var orConditions;

      if (typeof txtSearch !== "undefined") {
        const searchRegex = new RegExp(txtSearch, "i");
        orConditions = [
          {
            lotNumber: searchRegex,
          },
        ];
        params.queryCondition["$or"] = orConditions;
      }

      if (typeof lotStatus !== "undefined") {
        params.queryCondition["status"] = lotStatus;
      }
      if (typeof type !== "undefined") {
        params.queryCondition["accountExpense.type"] = type;
      }

      result = await InventoryLotModel.getALLInventoryLots(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.getInventoryLotsByJob = async (req, res) => {
  var result = new DataResponse();

  try {
    var InventoryLotModel = InventoryModel.lot;

    result = await InventoryLotModel.getALLInventoryLotsByJob();
    for (var i = 0; i < result.data.length; i++) {
      result.data[i].type = "lots";
      result.data[i].documentNumber = result.data[i].lotNumber;
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

// 👉 Post/Insert

exports.insertInventoryLot = async (req, res) => {
  var result = new DataResponse();

  try {
    var docsName = "documents";

    var resUpload = await upload.uploadFiles(req, res, [
      {
        name: docsName,
        path: "./assets/documents/inventory/lots",
        maxCount: 5,
        allowType: ["pdf"],
      },
    ]);

    if (resUpload.success) {
      const validation = new Validator(req.body, {
        lotNumber: "required",
        estimatedDate: "required|dateFormat:YYYY-MM-DD",
        status: "required|in:draft,inactive,active",
        quantity: "required",
        warranty: "required",
        expense_id: "required",
        productModel_id: "required",
      });
      const matched = await validation.check();
      if (matched) {
        const {
          lotNumber,
          estimatedDate,
          status,
          quantity,
          warranty,
          expense_id,
          productModel_id,
        } = req.body;

        const userData = req.body.authData.userInfo.userData;

        var productModel_ids = [];

        if (typeof productModel_id == "string") {
          productModel_ids[0] = productModel_id;
        } else {
          productModel_ids = productModel_id;
        }

        var AccountExpenseModel = AccountModel.expense;

        const expenseResult = await AccountExpenseModel.getAccountExpenseById(
          {
            _id: expense_id,
          },
          {
            _id: 1,
            documentNumber: 1,
            category: 1,
            type: 1,
          }
        );
        if (expenseResult.code == 1) {
          const productResult = await ProductModel.getProductsbyArrayId(
            productModel_ids,
            {
              _id: 1,
              name: 1,
              modelCode: 1,
            }
          );

          var quantities = [];

          if (typeof quantity == "string") {
            quantities[0] = quantity;
          } else {
            quantities = quantity;
          }

          var warranties = [];

          if (typeof warranty == "string") {
            warranties[0] = warranty;
          } else {
            warranties = warranty;
          }

          if (productResult.code == 1) {
            for (var i = 0; i < productModel_ids.length; i++) {
              for (var j = 0; j < productResult.data.length; j++) {
                if (productModel_ids[i] == productResult.data[j]._id) {
                  productResult.data[j].quantity = quantities[i];
                  productResult.data[j].warranty = warranties[i];
                  break;
                }
              }
            }

            var documents = [];

            for (let i = 0; i < req.files[docsName]?.length; i++) {
              documents[i] = {
                name: req.files[docsName][i].originalname,
                path: req.files[docsName][i].path,
              };
            }

            var insertLotparams = {
              lotNumber: lotNumber,
              estimatedDate: estimatedDate,
              status: status,
              quantity: quantities,
              warranty: warranties,
              accountExpense: {
                expense_id: expenseResult.data._id,
                documentNumber: expenseResult.data.documentNumber,
                category: expenseResult.data.category,
                type: expenseResult.data.type,
              },
              productModel: productResult.data,
              documents: documents,
              createdBy: {
                user_id: userData._id,
                firstname: userData.firstname,
                lastname: userData.lastname,
              },
            };
            var InventoryLotModel = InventoryModel.lot;
            result = await InventoryLotModel.insertInventoryLot(
              insertLotparams
            );
          } else {
            result.doError(5, "product_ids is not found!");
          }
        } else {
          result.doError(5, "expense_id is not found!");
        }
      } else {
        result.doError(2, validation.errors);
      }
    } else {
      result.doError(7, "Files is wrong format, please check!");
    }
  } catch (error) {
    console.log(error);
  }

  if (result.code != 1) {
    for (let i = 0; i < req.files[docsName]?.length; i++) {
      fs.rmSync(req.files[docsName][i].path, {
        force: true,
      });
    }
  }

  res.json(result);
};

// 👉 Delete

exports.deleteInventoryLot = async (req, res, next) => {
  let { _id } = req.body;

  let result = null;
  let message = "Insert failed";
  let statusCode = 400;

  var InventoryLotModel = InventoryModel.lot;

  if (_id !== undefined) {
    result = await InventoryLotModel.deleteInventoryLot({ _id: _id });

    if (result != null) {
      statusCode = 200;
      message = "Delete inventory lot successfully";
    } else {
      message = "Ops!!! something has gone wrong.";
    }
  } else {
    message = "_id is required!";
  }

  res.status(statusCode).send({ message, result });
};

exports.updateInventoryLot = async (req, res, next) => {
  var result = new DataResponse();
  try {
    var docsName = "documents";

    var resUpload = await upload.uploadFiles(req, res, [
      {
        name: docsName,
        path: "./assets/documents/inventory/lots",
        maxCount: 5,
        allowType: ["pdf"],
      },
    ]);
    if (resUpload.success) {
      const validation = new Validator(req.body, {
        _id: "required",
        lotNumber: "required",
        estimatedDate: "required|dateFormat:YYYY-MM-DD",
        status: "required|in:draft,inactive,active",
        quantity: "required",
        warranty: "required",
        expense_id: "required",
        productModel_id: "required",
      });

      const matched = await validation.check();

      if (matched) {
        var {
          _id,
          lotNumber,
          estimatedDate,
          status,
          quantity,
          warranty,
          expense_id,
          productModel_id,
          documentsRemove,
        } = req.body;

        /* var myExpense = [];

        if (typeof req.body.expense_id == "object") {
          myExpense = req.body.expense_id;
        } else if (typeof req.body.expense_id == "string") {
          myExpense[0] = req.body.expense_id;
        }

        console.log(myExpense); */

        const updateConditions = {
          _id: _id,
        };

        var productModel_ids = [];

        if (typeof productModel_id == "string") {
          productModel_ids[0] = productModel_id;
        } else {
          productModel_ids = productModel_id;
        }

        var AccountExpenseModel = AccountModel.expense;

        const expenseResult = await AccountExpenseModel.getAccountExpenseById(
          {
            _id: expense_id,
          },
          {
            _id: 1,
            documentNumber: 1,
            category: 1,
            type: 1,
          }
        );

        if (expenseResult.code == 1) {
          const productResult = await ProductModel.getProductsbyArrayId(
            productModel_ids,
            {
              _id: 1,
              name: 1,
              modelCode: 1,
            }
          );
          var quantities = [];

          if (typeof quantity == "string") {
            quantities[0] = quantity;
          } else {
            quantities = quantity;
          }

          var warranties = [];

          if (typeof warranty == "string") {
            warranties[0] = warranty;
          } else {
            warranties = warranty;
          }

          if (productResult.code == 1) {
            for (var i = 0; i < productModel_ids.length; i++) {
              for (var j = 0; j < productResult.data.length; j++) {
                if (productModel_ids[i] == productResult.data[j]._id) {
                  productResult.data[j].quantity = quantities[i];
                  productResult.data[j].warranty = warranties[i];
                  break;
                }
              }
            }

            var documents = [];

            for (let i = 0; i < req.files[docsName]?.length; i++) {
              documents[i] = {
                name: req.files[docsName][i].originalname,
                path: req.files[docsName][i].path,
              };
            }

            var params = {};

            params = {
              _id: _id,
              lotNumber: lotNumber,
              estimatedDate: estimatedDate,
              status: status,
              quantity: quantities,
              warranty: warranties,
              accountExpense: {
                expense_id: expenseResult.data._id,
                documentNumber: expenseResult.data.documentNumber,
                category: expenseResult.data.category,
                type: expenseResult.data.type,
              },
              productModel: productResult.data,
            };
            params["$push"] = {};

            params["$push"] = {
              documents: { $each: documents },
            };

            result = await InventoryModel.lot.updateOneInventoryLot(
              updateConditions,
              params
            );

            if (typeof documentsRemove == "undefined") documentsRemove = [];

            if (typeof documentsRemove === "string") {
              documentsRemove = [documentsRemove];
            }
            params = {};
            params["$pull"] = {
              documents: { _id: { $in: documentsRemove } },
            };

            result = await InventoryModel.lot.updateOneInventoryLot(
              updateConditions,
              params
            );
          } else {
            result.doError(5, "product_ids is not found!");
          }
        } else {
          result.doError(5, "expense_id is not found!");
        }
      } else {
        result.doError(2, validation.errors);
      }
    } else {
      result.doError(7, "Files is wrong format, please check!");
    }
  } catch (e) {
    console.log(e);
  }
  if (result.code != 1) {
    for (let i = 0; i < req.files[docsName]?.length; i++) {
      fs.rmSync(req.files[docsName][i].path, {
        force: true,
      });
    }
  }
  res.json(result);
};

exports.updateCurrentStatusInventoryLot = async (req, res) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      _id: "required",
    });
    const matched = await validation.check();

    if (matched) {
      const { _id } = req.body;
      const userData = req.body.authData.userInfo.userData;

      const conditions = {
        _id: new ObjectId(_id),
      };
      const [inventoryLotsResult, productSerialResult] = await Promise.all([
        InventoryModel.lot.getInventoryLotById(
          {
            _id: new ObjectId(_id),
          },
          {
            productModel: 1,
          }
        ),
        InventoryModel.productSerial.getProductSerialByConditions({
          lot_id: new ObjectId(_id),
        }),
      ]);

      var checkAllDone = true;
      for (var i = 0; i < inventoryLotsResult.data.productModel.length; i++) {
        var refund = inventoryLotsResult.data.productModel[i];
        for (var j = 0; j < productSerialResult.data.length; j++) {
          var serial = productSerialResult.data[j];
          if (refund.modelCode == serial.productModel.modelCode) {
            if (refund.quantity > serial.length) {
              checkAllDone = false;
            }
            break;
          }
        }
      }
      if (checkAllDone) {
        var params = {
          currentStatus: "done",
          updateBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        };

        result = await InventoryModel.lot.updateLot(conditions, params);
      } else {
        result.doError(
          3,
          "The number of products in the database is not equal!"
        );
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

exports.updateLocationsSelected = async (req, res) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      _id: "required",
    });

    const matched = await validation.check();

    if (matched) {
      const { _id } = req.body;
      const conditions = {
        _id: new ObjectId(_id),
      };

      var productSerialResult =
        await InventoryModel.productSerial.getProductSerialByConditions({
          lot_id: new ObjectId(_id),
        });
      if (productSerialResult.code == 2) {
        var params = {};
        params["$unset"] = {};

        params["$unset"] = { inventoryLocation: "" };

        result = await InventoryModel.lot.updateLot(conditions, params);
        console.log(result);
      } else {
        result.doError(5, "There are still products in this lot!");
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};
