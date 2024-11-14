// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let ProductModel = require("../../models/Products");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { ObjectId } = require("mongodb");

// 👉 Get all or by ID

exports.getInventoryMoves = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id, txtSearch, moveStatus } = req.query;

    var InventoryMoveModel = InventoryModel.move;

    if (typeof _id != "undefined") {
      const [inventoryMoveResult, inventoryProductSerialMove] =
        await Promise.all([
          InventoryMoveModel.getInventoryMoveById({
            _id: new Object(_id),
          }),
          InventoryModel.productSerialMove.getProductSerialMoveByConditions({
            "inventoryMove.move_id": _id,
          }),
        ]);
      const scanRefundProductModel = inventoryProductSerialMove.data;
      if (inventoryProductSerialMove.code == 1) {
        for (var i = 0; i < inventoryMoveResult.data.productModel.length; i++) {
          inventoryMoveResult.data.productModel[i].scaned = 0;
          inventoryMoveResult.data.productModel[i].left =
            inventoryMoveResult.data.productModel[i].quantity;

          for (var k = 0; k < scanRefundProductModel.length; k++) {
            if (
              scanRefundProductModel[k].productModel.productModel_id.equals(
                inventoryMoveResult.data.productModel[i]._id
              )
            ) {
              inventoryMoveResult.data.productModel[i].scaned =
                scanRefundProductModel[k].inventoryProductSerial.length;

              inventoryMoveResult.data.productModel[i].left =
                inventoryMoveResult.data.productModel[i].quantity -
                inventoryMoveResult.data.productModel[i].scaned;
              break;
            }
          }
        }
      }
      result = inventoryMoveResult;
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
            documentNumber: searchRegex,
          },
          {
            "inventoryLocation.origin.name": searchRegex,
          },
          {
            "inventoryLocation.destination.name": searchRegex,
          },
        ];
        params.queryCondition["$or"] = orConditions;
      }

      if (typeof moveStatus !== "undefined") {
        params.queryCondition["currentStatus"] = moveStatus;
      }

      result = await InventoryMoveModel.getAllInventoryMoves(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.getInventoryAllMoveByJob = async (req, res) => {
  var result = new DataResponse();
  try {
    const InventoryMoveModel = InventoryModel.move;

    result = await InventoryMoveModel.getAllInventoryMoveByJob();

    for (var i = 0; i < result.data.length; i++) {
      result.data[i].type = "move";
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

// 👉 Post/Insert

exports.insertInventoryMove = async (req, res) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      documentNumber: "required",
      dueDate: "required|dateFormat:YYYY-MM-DD",
      inventoryLocation_origin_id: "required",
      inventoryLocation_destination_id: "required",
      products: "required",
    });
    const matched = await validation.check();

    var InventoryMoveModel = InventoryModel.move;

    if (matched) {
      const {
        documentNumber,
        dueDate,
        inventoryLocation_origin_id,
        inventoryLocation_destination_id,
        products,
      } = req.body;

      const userData = req.body.authData.userInfo.userData;

      var InventoryLocationModel = InventoryModel.location;

      const locationResult =
        await InventoryLocationModel.getInventoryLocationbyArrayId(
          [inventoryLocation_origin_id, inventoryLocation_destination_id],
          {
            _id: 1,
            name: 1,
          }
        );

      var productModel_ids = [];

      for (var i = 0; i < products.length; i++) {
        productModel_ids[i] = products[i]._id;
      }

      if (locationResult.code == 1 && locationResult.data.length >= 2) {
        const productResult = await ProductModel.getProductsbyArrayId(
          productModel_ids,
          {
            _id: 1,
            name: 1,
            modelCode: 1,
          }
        );

        if (
          productResult.code == 1 &&
          products.length == productResult.data.length
        ) {
          for (var i = 0; i < productResult.data.length; i++) {
            for (var j = 0; j < products.length; j++) {
              if (productResult.data[i]._id == products[j]._id) {
                productResult.data[i].quantity = products[j].quantity;
                break;
              }
            }
          }

          var insertMoveparams = {
            inventoryLocation: {
              origin: {
                location_id:
                  locationResult.data[0]._id == inventoryLocation_origin_id
                    ? locationResult.data[0]._id
                    : locationResult.data[1]._id,
                name:
                  locationResult.data[0]._id == inventoryLocation_origin_id
                    ? locationResult.data[0].name
                    : locationResult.data[1].name,
              },
              destination: {
                location_id:
                  locationResult.data[0]._id == inventoryLocation_destination_id
                    ? locationResult.data[0]._id
                    : locationResult.data[1]._id,
                name:
                  locationResult.data[0]._id == inventoryLocation_destination_id
                    ? locationResult.data[0].name
                    : locationResult.data[1].name,
              },
            },
            documentNumber: documentNumber,
            dueDate: dueDate,
            productModel: productResult.data,
            createdBy: {
              user_id: userData._id,
              firstname: userData.firstname,
              lastname: userData.lastname,
            },
          };

          result = await InventoryMoveModel.insertInventoryMove(
            insertMoveparams
          );
        } else {
          result.doError(5, "Some of product is not found");
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

exports.getNewMoveId = async (req, res) => {
  var result = new DataResponse();

  try {
    result = await InventoryModel.move.getNewInventoryMoveId();
    const formattedDate = new Date(
      new Date().setFullYear(new Date().getFullYear() + 543)
    )
      .toISOString()
      .slice(2, 7)
      .replace(/-/g, "");

    var preDoc = formattedDate;
    var newDocumentNumber = preDoc + "-" + "0001";
    if (result.data != null) {
      var oldDocumentInArray = result.data.documentNumber.split("-");

      if (
        typeof oldDocumentInArray[0] != "undefined" &&
        oldDocumentInArray[0] == formattedDate
      ) {
        // Still in the same year and mounth
        preDoc = oldDocumentInArray[0];
        newDocumentNumber = parseInt(oldDocumentInArray[1]) + 1;
        newDocumentNumber = String(newDocumentNumber).padStart(4, "0");
      } else {
        newDocumentNumber = "0001";
      }

      newDocumentNumber = preDoc + "-" + newDocumentNumber;
    }
    result.data = {
      documentNumber: newDocumentNumber,
    };
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

exports.deleteInventoryMove = async (req, res, next) => {
  let { _id } = req.body;

  let result = null;
  let message = "Insert failed";
  let statusCode = 400;

  var InventoryMoveModel = InventoryModel.move;

  if (_id !== undefined) {
    result = await InventoryMoveModel.deleteInventoryMove({ _id: _id });

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

exports.getProductsSerialByMove = async (req, res) => {
  var result = new DataResponse();
  try {
    const { location_id } = req.query;
    if (location_id) {
      result = await InventoryModel.productSerial.getProductSerialByMove(
        location_id
      );
    } else {
      result.doError(0, "location_id is require!");
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

exports.updateInventoryMove = async (req, res, next) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      _id: "required",
    });
    const matched = await validation.check();

    if (matched) {
      const { _id, status, productModel } = req.body;

      const userData = req.body.authData.userInfo.userData;

      const conditions = {
        _id: new ObjectId(_id),
      };

      const [inventoryMoveResult, productSerialMoveResult] = await Promise.all([
        InventoryModel.move.getInventoryMoveById(
          {
            _id: new ObjectId(_id),
          },
          {
            productModel: 1,
          }
        ),
        InventoryModel.productSerialMove.getProductSerialMoveByConditions({
          "inventoryMove.move_id": new ObjectId(_id),
        }),
      ]);
      var checkAllDone = true;
      for (var i = 0; i < inventoryMoveResult.data.productModel.length; i++) {
        var refund = inventoryMoveResult.data.productModel[i];
        for (var j = 0; j < productSerialMoveResult.data.length; j++) {
          var serial = productSerialMoveResult.data[j];
          if (refund.modelCode == serial.productModel.modelCode) {
            if (refund.quantity > serial.inventoryProductSerial.length) {
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

        result = await InventoryModel.move.updateMove(conditions, params);
      } else {
        result.doError(
          3,
          "The number of products in the database is not equal!"
        );
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};
