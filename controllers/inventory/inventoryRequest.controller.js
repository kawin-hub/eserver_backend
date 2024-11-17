// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let ProductModel = require("../../models/Products");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { ObjectId } = require("mongodb");
const {
  getProductSerialRequestsByRequestId,
} = require("../inventory/inventoryProductSerialRequest.controller");
const { request } = require("express");

// 👉 Get all or by ID

const getInventoryRequestByParam = async (param) => {
  var result = new DataResponse();
  try {
    var InventoryRequestModel = InventoryModel.request;
    result = await InventoryRequestModel.getInventoryRequestById(param);
  } catch (error) {}
  return result;
};

/* exports.getInventoryRequests = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id, txtSearch, subStatus, purposeStatus } = req.query;

    var InventoryRequestModel = InventoryModel.request;

    if (typeof _id != "undefined") {
      result = await getInventoryRequestByParam({
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

      var orConditions;

      if (typeof txtSearch !== "undefined") {
        const searchRegex = new RegExp(txtSearch, "i");
        orConditions = [
          {
            documentNumber: searchRegex,
          },
          {
            requestType: searchRegex,
          },
        ];
        params.queryCondition["$or"] = orConditions;
      }

      if (typeof subStatus !== "undefined") {
        params.queryCondition["currentStatus"] = subStatus;
      }

      if (typeof purposeStatus !== "undefined") {
        params.queryCondition["requestType"] = purposeStatus;
      }

      result = await InventoryRequestModel.getAllInventoryRequests(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
}; */

exports.getInventoryAllRequestDetail = async (req, res) => {
  var result = new DataResponse();
  try {
    const { _id, txtSearch, subStatus, purposeStatus } = req.query;
    var InventoryRequestModel = InventoryModel.request;
    if (typeof _id != "undefined") {
      const [inventoryRequestResult, inventoryProductSerialRequest] =
        await Promise.all([
          getInventoryRequestByParam({
            _id: new Object(_id),
          }),
          getProductSerialRequestsByRequestId({
            "inventoryRequest.request_id": new Object(_id),
          }),
          ,
        ]);

      const scanOutProductModel = inventoryProductSerialRequest.data;
      if (inventoryProductSerialRequest.code == 1) {
        for (
          var i = 0;
          i < inventoryRequestResult.data.productModel.length;
          i++
        ) {
          inventoryRequestResult.data.productModel[i].scaned = 0;
          inventoryRequestResult.data.productModel[i].left =
            inventoryRequestResult.data.productModel[i].quantity;

          for (var k = 0; k < scanOutProductModel.length; k++) {
            if (
              scanOutProductModel[k].productModel.productModel_id.equals(
                inventoryRequestResult.data.productModel[i]._id
              )
            ) {
              inventoryRequestResult.data.productModel[i].scaned =
                scanOutProductModel[k].inventoryProductSerial.length;

              inventoryRequestResult.data.productModel[i].left =
                inventoryRequestResult.data.productModel[i].quantity -
                inventoryRequestResult.data.productModel[i].scaned;
              break;
            }
          }
        }
      }

      result = inventoryRequestResult;
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
            requestType: searchRegex,
          },
        ];
        params.queryCondition["$or"] = orConditions;
      }

      if (typeof subStatus !== "undefined") {
        params.queryCondition["currentStatus"] = subStatus;
      }

      if (typeof purposeStatus !== "undefined") {
        params.queryCondition["requestType"] = purposeStatus;
      }

      result = await InventoryRequestModel.getAllInventoryRequests(params);
    }
  } catch (error) {}

  res.json(result);
};

exports.getInventoryAllRequestByJob = async (req, res) => {
  var result = new DataResponse();
  try {
    const InventoryRequestModel = InventoryModel.request;

    result = await InventoryRequestModel.getAllInventoryRequestsByJob();
    for (var i = 0; i < result.data.length; i++) {
      result.data[i].type = "request";
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

// 👉 Post/Insert

exports.getInventoryRequestBySellStatus = async (req, res) => {
  var result = new DataResponse();
  try {
    var params = {
      queryCondition: {},
    };

    params.queryCondition["requestType"] = "sell";

    result = await InventoryModel.request.getAllInventoryRequests(params);
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

exports.insertInventoryRequest = async (req, res) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      documentNumber: "required",
      dueDate: "required|dateFormat:YYYY-MM-DD",
      requestType: "required|in:sell,booking,borrow,broken,r&d,gift,others",
      products: "required",
    });
    const matched = await validation.check();

    var InventoryRequestModel = InventoryModel.request;

    if (matched) {
      const {
        documentNumber,
        dueDate,
        requestType,
        estimatedReturnDate,
        remark,
        products,
        quotation_id,
      } = req.body;

      const userData = req.body.authData.userInfo.userData;

      var productModel_ids = [];

      for (var i = 0; i < products.length; i++) {
        productModel_ids[i] = products[i]._id;
      }

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
        var insertRequestparams = {
          documentNumber: documentNumber,
          quotation: {
            quotation_id: quotation_id,
          },
          dueDate: dueDate,
          requestType: requestType,
          estimatedReturnDate:
            typeof estimatedReturnDate != "undefined"
              ? estimatedReturnDate
              : null,
          remark: typeof remark != "undefined" ? remark : "",
          productModel: productResult.data,
          createdBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        };

        result = await InventoryRequestModel.insertInventoryRequest(
          insertRequestparams
        );
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

exports.getNewRequestId = async (req, res) => {
  var result = new DataResponse();
  try {
    result = await InventoryModel.request.getNewInventoryRequestId();
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
    } else {
      result.data._id = null;
    }
    result.data.documentNumber = newDocumentNumber;
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

exports.deleteInventoryRequest = async (req, res, next) => {
  let { _id } = req.body;

  let result = null;
  let message = "Insert failed";
  let statusCode = 400;

  var InventoryRequestModel = InventoryModel.request;

  if (_id !== undefined) {
    result = await InventoryRequestModel.deleteInventoryRequest({ _id: _id });

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

exports.updateInventoryRequest = async (req, res, next) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      _id: "required",
    });

    const matched = await validation.check();

    var InventoryRequestModel = InventoryModel.request;

    if (matched) {
      const { _id, estimatedReturnDate, remark } = req.body;

      const userData = req.body.authData.userInfo.userData;

      const conditions = {
        _id: _id,
      };

      var params = {
        estimatedReturnDate:
          typeof estimatedReturnDate != "undefined"
            ? estimatedReturnDate
            : null,
        remark: typeof remark != "undefined" ? remark : "",
        updateBy: {
          user_id: userData._id,
          firstname: userData.firstname,
          lastname: userData.lastname,
        },
      };

      result = await InventoryRequestModel.updateRequest(conditions, params);
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.getNewRequestNumber = async (req, res) => {
  var result = new DataResponse();
  try {
    var { requestType } = req.query;
    if (requestType) {
      result = await InventoryModel.request.getNewInventoryRequestId({
        requestType: requestType,
      });

      const defaultRequestNumber = "00001";

      const formattedDate = new Date(
        new Date().setFullYear(new Date().getFullYear() + 543)
      )
        .toISOString()
        .slice(2, 7)
        .replace(/-/g, "");
      var preDoc = formattedDate;
      var newDocumentNumber = preDoc + "-" + defaultRequestNumber;

      var alreadyCreateNewRequestNumber = false;

      if (result.code == 1) {
        var oldDocumentInArray = result.data.documentNumber.split("-");

        var shortTypeDoc = oldDocumentInArray[0].substring(0, 2);
        var oldPreDoc = oldDocumentInArray[0]?.substring(2);

        if (
          typeof oldDocumentInArray[0] != "undefined" &&
          oldPreDoc == formattedDate
        ) {
          // Still in the same year and mounth
          preDoc = oldPreDoc;
          newDocumentNumber = parseInt(oldDocumentInArray[1]) + 1;
          newDocumentNumber = String(newDocumentNumber).padStart(5, "0");
          newDocumentNumber = shortTypeDoc + preDoc + "-" + newDocumentNumber;
          alreadyCreateNewRequestNumber = true;
        }
      }

      if (result.code == 2 || !alreadyCreateNewRequestNumber) {
        var shortTypeDoc =
          requestType == "sell"
            ? "SL"
            : requestType == "booking"
            ? "BK"
            : requestType == "borrow"
            ? "BR"
            : requestType == "broken"
            ? "BN"
            : requestType == "gift"
            ? "GF"
            : requestType == "r&d"
            ? "RD"
            : "OT";
        newDocumentNumber = shortTypeDoc + newDocumentNumber;
      }

      result.doSuccess(1, "New document number is created successfully!");
      result.data = {
        newDocumentNumber: newDocumentNumber,
      };
    } else {
      result.doError(2, "RequestType is required!");
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
};

exports.updateStatusRequestDone = async (req, res, next) => {
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

      const [inventoryRequestResult, productSerialRequestResult] =
        await Promise.all([
          InventoryModel.request.getInventoryRequestById(
            {
              _id: new ObjectId(_id),
            },
            {
              productModel: 1,
            }
          ),
          InventoryModel.productSerialRequest.getProductSerialRequestByConditions(
            {
              "inventoryRequest.request_id": new ObjectId(_id),
            }
          ),
        ]);
      var checkAllDone = true;
      for (
        var i = 0;
        i < inventoryRequestResult.data.productModel.length;
        i++
      ) {
        var refund = inventoryRequestResult.data.productModel[i];
        for (var j = 0; j < productSerialRequestResult.data.length; j++) {
          var serial = productSerialRequestResult.data[j];
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

        result = await InventoryModel.request.updateRequest(conditions, params);
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
