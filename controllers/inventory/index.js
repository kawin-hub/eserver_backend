//Inventory model
let InventoryModel = require("../../models/Inventory");
let AccountModel = require("../../models/Account");
let ProductModel = require("../../models/Products");
let dotenv = require("dotenv");
let { upload, general } = require("../../middleware");
const fs = require("fs");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { match } = require("assert");
const { ObjectId } = require("mongoose").Types;
const inventoryProductSerial = require("./inventoryProductSerial.controller");
const inventoryLocation = require("./inventoryLocation.controller");

dotenv.config();

//Inventory Lot

const getInventoryLots = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id } = req.query;

    if (typeof _id != "undefined") {
      result = await InventoryModel.getInventoryLotById({
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

      result = await InventoryModel.getALLInventoryLots(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

const insertInventoryLot = async (req, res) => {
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
        product_ids: "required",
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
          product_ids,
        } = req.body;
        const expenseResult = await AccountModel.getAccountExpenseById({
          _id: expense_id,
        });

        if (expenseResult.code == 1) {
          const productResult = await ProductModel.getProductsbyArrayId({
            _id: product_ids,
          });

          if (productResult.code == 1) {
            for (var i = 0; i < product_ids.length; i++) {
              for (var j = 0; j < productResult.data.length; j++) {
                if (product_ids[i] == productResult.data[j]._id) {
                  productResult.data[j].quantity = quantity[i];
                  productResult.data[j].warranty = warranty[i];
                  break;
                }
              }
            }

            var documents = [];

            for (let i = 0; i < req.files[docsName].length; i++) {
              documents[i] = {
                name: req.files[docsName][i].originalname,
                path: req.files[docsName][i].path,
              };
            }
            var params = {
              lotNumber: lotNumber,
              estimatedDate: estimatedDate,
              status: status,
              quantity: quantity,
              warranty: warranty,
              expense: expenseResult.data,
              products: productResult.data,
              documents: documents,
            };
            result = await InventoryModel.insertInventoryLot(params);
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
    for (let i = 0; i < req.files[docsName].length; i++) {
      fs.rmSync(req.files[docsName][i].path, {
        force: true,
      });
    }
  }

  res.json(result);
};

const deleteInventoryLot = async (req, res, next) => {
  let { _id } = req.body;

  let result = null;
  let message = "Insert failed";
  let statusCode = 400;

  if (_id !== undefined) {
    result = await InventoryModel.deleteInventoryLot({ _id: _id });

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

//Inventory Move

const getInventoryMoves = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id } = req.query;

    if (typeof _id != "undefined") {
      result = await InventoryModel.getInventoryMoveById({
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

      result = await InventoryModel.getAllInventoryMoves(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

const insertInventoryMove = async (req, res) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      documentNumber: "required",
      dueDate: "required|dateFormat:YYYY-MM-DD",
      location_origin_id: "required",
      location_destination_id: "required",
      product_ids: "required",
      quantity: "required",
    });

    const matched = await validation.check();

    if (matched) {
      const {
        documentNumber,
        dueDate,
        location_origin_id,
        location_destination_id,
        product_ids,
        quantity,
      } = req.body;
      const locationResult = await InventoryModel.getInventoryLocationbyArrayId(
        [location_origin_id, location_destination_id]
      );

      if (locationResult.code == 1 && locationResult.data.length >= 2) {
        const productResult = await ProductModel.getProductsbyArrayId({
          _id: product_ids,
        });

        if (productResult.code == 1) {
          for (var i = 0; i < product_ids.length; i++) {
            for (var j = 0; j < productResult.data.length; j++) {
              if (product_ids[i] == productResult.data[j]._id) {
                productResult.data[j].quantity = quantity[i];
                break;
              }
            }
          }

          var params = {
            location: {
              origin: {
                _id:
                  locationResult.data[0]._id == location_origin_id
                    ? locationResult.data[0]._id
                    : locationResult.data[1]._id,
                name:
                  locationResult.data[0]._id == location_origin_id
                    ? locationResult.data[0].name
                    : locationResult.data[1].name,
              },
              destination: {
                _id:
                  locationResult.data[0]._id == location_destination_id
                    ? locationResult.data[0]._id
                    : locationResult.data[1]._id,
                name:
                  locationResult.data[0]._id == location_destination_id
                    ? locationResult.data[0].name
                    : locationResult.data[1].name,
              },
            },
            documentNumber: documentNumber,
            dueDate: dueDate,
            products: productResult.data,
            quantity: quantity,
          };

          result = await InventoryModel.insertInventoryMove(params);
        } else {
          result.doError(5, "product_ids is not found!");
        }
      } else {
        result.doError(5, "location_id is not found!");
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

//Inventory Borrow

const getInventoryBorrows = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id } = req.query;

    if (typeof _id != "undefined") {
      result = await InventoryModel.getInventoryBorrowById({
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

      result = await InventoryModel.getAllInventoryBorrows(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

const insertInventoryBorrow = async (req, res) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      documentNumber: "required",
      dueDate: "required|dateFormat:YYYY-MM-DD",
      estimatedDate: "required",
      purpose: "required|in:demo,service,spare,test",
      mainStatus: "required|in:rent,request",
      product_ids: "required",
      quantity: "required",
    });

    const matched = await validation.check();

    if (matched) {
      const {
        documentNumber,
        dueDate,
        estimatedDate,
        purpose,
        mainStatus,
        product_ids,
      } = req.body;
      const productResult = await ProductModel.getProductsbyArrayId({
        _id: product_ids,
      });

      if (productResult.code == 1) {
        for (var i = 0; i < product_ids.length; i++) {
          for (var j = 0; j < productResult.data.length; j++) {
            if (product_ids[i] == productResult.data[j]._id) {
              productResult.data[j].quantity = quantity[i];
              break;
            }
          }
        }
        var params = {
          documentNumber: documentNumber,
          dueDate: dueDate,
          estimatedDate: estimatedDate,
          purpose: purpose,
          mainStatus: mainStatus,
          products: productResult.data,
        };

        result = await InventoryModel.insertInventoryBorrow(params);
      } else {
        result.doError(5, "product_ids is not found!");
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

//Inventory Refund

const insertInventoryRefund = async (req, res) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      documentNumber: "required",
    });

    const matched = await validation.check();

    if (matched) {
      const { documentNumber } = req.body;

      const params = {
        documentNumber: documentNumber,
      };

      result = await InventoryModel.insertInventoryRefund(params);
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

module.exports = {
  getInventoryLots,
  insertInventoryLot,
  deleteInventoryLot,
  getInventoryMoves,
  insertInventoryMove,
  getInventoryBorrows,
  insertInventoryBorrow,
  insertInventoryRefund,
  inventoryProductSerial,
  inventoryLocation,
};
