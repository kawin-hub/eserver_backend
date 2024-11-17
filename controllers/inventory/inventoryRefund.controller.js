let InventoryModel = require("../../models/Inventory");
let ProductModel = require("../../models/Products");
let { upload, general } = require("../../middleware");
const fs = require("fs");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { type } = require("express/lib/response");
const { ObjectId } = require("mongodb");

exports.getInventoryRefunds = async (req, res) => {
  var result = new DataResponse();
  try {
    const { _id, txtSearch, status, getby } = req.query;

    var inventoryRefundModel = InventoryModel.refund;
    if (typeof _id != "undefined") {
      const [inventoryRefundResult, inventoryProductSerialRefund] =
        await Promise.all([
          inventoryRefundModel.getInventoryRefundById({
            _id: new Object(_id),
          }),
          InventoryModel.productSerialRefund.getProductSerialRefundByConditions(
            {
              "inventoryRefund.refund_id": _id,
            }
          ),
        ]);

      const scanRefundProductModel = inventoryProductSerialRefund.data;
      if (inventoryProductSerialRefund.code == 1) {
        for (
          var i = 0;
          i < inventoryRefundResult.data.productModel.length;
          i++
        ) {
          inventoryRefundResult.data.productModel[i].scaned = 0;
          inventoryRefundResult.data.productModel[i].left =
            inventoryRefundResult.data.productModel[i].quantity;

          for (var k = 0; k < scanRefundProductModel.length; k++) {
            if (
              scanRefundProductModel[k].productModel.productModel_id.equals(
                inventoryRefundResult.data.productModel[i]._id
              )
            ) {
              inventoryRefundResult.data.productModel[i].scaned =
                scanRefundProductModel[k].inventoryProductSerial.length;

              inventoryRefundResult.data.productModel[i].left =
                inventoryRefundResult.data.productModel[i].quantity -
                inventoryRefundResult.data.productModel[i].scaned;
              break;
            }
          }
        }
      }
      result = inventoryRefundResult;
    } else if (getby === "job") {
      var pageOption = general.checkPageAndLimit(
        req.query.page,
        req.query.limit
      );

      var params = {
        page: pageOption.page,
        limit: pageOption.limit,
        queryCondition: {},
      };

      result = await inventoryRefundModel.getAllInventoryRefundsByJob(params);
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
            "inventoryRequest.documentNumber": searchRegex,
          },
        ];
        params.queryCondition["$or"] = orConditions;
      }

      if (typeof status !== "undefined") {
        params.queryCondition["status"] = status;
      }

      result = await inventoryRefundModel.getAllInventoryRefunds(params);
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

exports.getInventoryRefundsByjob = async (req, res) => {
  var result = new DataResponse();
  try {
    var inventoryRefundModel = InventoryModel.refund;

    result = await inventoryRefundModel.getAllInventoryRefundsByJob();

    for (var i = 0; i < result.data.length; i++) {
      result.data[i].type = "refund";
      result.data[i].currentStatus = result.data[i].status;
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

exports.insertInventoryRefund = async (req, res) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      documentNumber: "required",
      products: "required",
      request_id: "required",
      location_id: "required",
      dueDate: "required",
    });
    const matched = await validation.check();
    if (matched) {
      const { documentNumber, products, request_id, dueDate, location_id } =
        req.body;
      const userData = req.body.authData.userInfo.userData;

      var productModel_ids = [];

      for (var i = 0; i < products.length; i++) {
        productModel_ids[i] = products[i]._id;
      }

      var [
        inventoryLocationResult,
        inventoryRequestResult,
        productModelResult,
      ] = await Promise.all([
        InventoryModel.location.getInventoryLocationById(
          {
            _id: location_id,
          },
          {
            _id: 1,
            name: 1,
          }
        ),
        InventoryModel.request.getInventoryRequestById(
          {
            _id: request_id,
          },
          {
            _id: 1,
            documentNumber: 1,
            productModel: 1,
          }
        ),
        ProductModel.getProductsbyArrayId(
          productModel_ids,

          {
            _id: 1,
            name: 1,
            modelCode: 1,
          }
        ),
      ]);

      if (
        inventoryLocationResult.code == 1 &&
        inventoryRequestResult.code == 1 &&
        productModelResult.code == 1
      ) {
        for (var i = 0; i < productModelResult.data.length; i++) {
          for (var j = 0; j < products.length; j++) {
            if (productModelResult.data[i]._id == products[j]._id) {
              productModelResult.data[i].quantity = products[j].quantity;
              break;
            }
          }
        }
        var insertRefundparams = {
          documentNumber: documentNumber,
          productModel: productModelResult.data,
          dueDate: dueDate,
          inventoryRequest: {
            request_id: inventoryRequestResult.data._id,
            documentNumber: inventoryRequestResult.data.documentNumber,
          },
          inventoryLocation: {
            location_id: inventoryLocationResult.data._id,
            name: inventoryLocationResult.data.name,
          },
          status: "request",
          createdBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        };
        result = await InventoryModel.refund.insertInventoryRefund(
          insertRefundparams
        );
      } else {
        result.doError(5, "Some of ref _id is not found");
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
};

exports.getNewRefundNumber = async (req, res) => {
  var result = new DataResponse();

  try {
    result = await InventoryModel.refund.getNewInventoryRefundNumber();
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

exports.getProductsRequestByRefund = async (req, res) => {
  var result = new DataResponse();
  try {
    const { request_id } = req.query;
    if (request_id) {
      result =
        await InventoryModel.productSerialRequest.getProductSerialByConditions(
          { "inventoryRequest.request_id": request_id },
          {
            productModel: 1,
            inventoryProductSerial: 1,
          }
        );
    } else {
      result.doError(0, "request_id is require!");
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

exports.updateInventoryRefund = async (req, res, next) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      _id: "required",
    });

    const matched = await validation.check();

    var InventoryRequestModel = InventoryModel.request;

    if (matched) {
      const { _id, status, productModel } = req.body;

      const userData = req.body.authData.userInfo.userData;

      const conditions = {
        _id: new ObjectId(_id),
      };

      const [inventoryRefundResult, productSerialRefundResult] =
        await Promise.all([
          InventoryModel.refund.getInventoryRefundById(
            {
              _id: new ObjectId(_id),
            },
            {
              productModel: 1,
            }
          ),
          InventoryModel.productSerialRefund.getProductSerialRefundByConditions(
            {
              "inventoryRefund.refund_id": new ObjectId(_id),
            }
          ),
        ]);
      var checkAllDone = true;

      for (var i = 0; i < inventoryRefundResult.data.productModel.length; i++) {
        var refund = inventoryRefundResult.data.productModel[i];
        for (var j = 0; j < productSerialRefundResult.data.length; j++) {
          var serial = productSerialRefundResult.data[j];
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
          status: "done",
          updateBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        };

        result = await InventoryModel.refund.updateRefund(conditions, params);
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
