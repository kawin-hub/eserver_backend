// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let ProductModel = require("../../models/Products");
let { general, upload } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { ObjectId } = require("mongodb");

// 👉 Post/Insert

exports.insertProductSerialRequest = async (req, res) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      request_id: "required",
      productModel_id: "required",
      inventoryProductSerials: "required",
    });

    const matched = await validation.check();
    if (matched) {
      const {
        request_id,
        productModel_id,
        inventoryProductSerials,
        inOutStatus,
      } = req.body;

      const userData = req.body.authData?.userInfo?.userData;

      var InventoryRequestModel = InventoryModel.request;
      var InventoryProductSerialModel = InventoryModel.productSerial;

      var inventoryProductSerial_ids = [];

      for (var i = 0; i < inventoryProductSerials.length; i++) {
        inventoryProductSerial_ids[i] = inventoryProductSerials[i]._id;
      }

      var [
        inventoryRequestResult,
        productModelResult,
        inventoryProductSerialResult,
      ] = await Promise.all([
        InventoryRequestModel.getInventoryRequestById(
          {
            _id: request_id,
          },
          {
            _id: 1,
            documentNumber: 1,
            dueDate: 1,
            requestType: 1,
            estimatedReturnDate: 1,
            remark: 1,
          }
        ),
        ProductModel.getProductModelsByParams(
          {
            _id: productModel_id,
          },
          {
            _id: 1,
            name: 1,
            modelCode: 1,
          }
        ),
        InventoryProductSerialModel.getProductSerialsbyArrayId(
          inventoryProductSerial_ids,
          {
            _id: 1,
            serialNumber: 1,
          }
        ),
      ]);

      if (
        inventoryRequestResult.code == 1 &&
        productModelResult.code == 1 &&
        inventoryProductSerialResult.code == 1
      ) {
        var insertProductSerialRequestparams = {
          inventoryRequest: {
            request_id: inventoryRequestResult.data._id,
            documentNumber: inventoryRequestResult.data.documentNumber,
            dueDate: inventoryRequestResult.data.dueDate,
            requestType: inventoryRequestResult.data.requestType,
            estimatedReturnDate:
              inventoryRequestResult.data.estimatedReturnDate,
            remark: inventoryRequestResult.data.remark,
          },
          productModel: {
            productModel_id: productModelResult.data._id,
            name: productModelResult.data.name,
            modelCode: productModelResult.data.modelCode,
          },
          InventoryProductSerial: inventoryProductSerialResult.data,
          inOutStatus: typeof inOutStatus != "undefined" ? inOutStatus : "",
          movements: [
            {
              status: "sell",
              docNumber: inventoryRequestResult.data.documentNumber,
              movementDateTime: Date.now(),
              createdBy: {
                user_id: userData._id,
                firstname: userData.firstname,
                lastname: userData.lastname,
              },
            },
          ],
          createdBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        };

        var productSerialRequestModel = InventoryModel.productSerialRequest;
        result = await productSerialRequestModel.insertProductSerialRequest(
          insertProductSerialRequestparams
        );
      } else {
        result.doError(5, "Some of ref _id is not found");
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

const getProductSerialRequestsByRequestId = async (param) => {
  var result = new DataResponse();
  try {
    var InventoryProductSerialRequest = InventoryModel.productSerialRequest;
    result = await InventoryProductSerialRequest.getProductSerialByConditions(
      param
    );
  } catch (error) {}
  return result;
};

exports.getProductSerialRequests = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id, getby } = req.query;
    if (typeof getby != "undefined" && getby == "requestId") {
      if (typeof _id != "undefined") {
        result = await getProductSerialRequestsByRequestId({
          "inventoryRequest.request_id": new Object(_id),
        });
      }
    } else {
      var InventoryRequestModel = InventoryModel.request;
      if (typeof _id != "undefined") {
        result = await InventoryRequestModel.getInventoryRequestById({
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

        result = await InventoryRequestModel.getAllInventoryRequests(params);
      }
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.getProductSerialRequestsByRequestId = async (param) => {
  return getProductSerialRequestsByRequestId(param);
};

exports.deleteProductRequest = async (req, res) => {
  const { _id, inventoryProductSerial_id, productSerial_id } = req.body;
  var result = new DataResponse();
  const userData = req.params.authData?.userInfo?.userData;
  try {
    if (
      typeof _id != "undefined" &&
      typeof inventoryProductSerial_id != "undefined"
    ) {
      var productSerialRequestResult =
        await InventoryModel.productSerialRequest.getProductSerialByConditions({
          _id: _id,
        });

      if (
        productSerialRequestResult.data[0].inventoryProductSerial.length <= 1
      ) {
        var params = {};
        params["$pull"] = {
          inventoryProductSerial: { _id: { $in: inventoryProductSerial_id } },
        };

        const conditions = {
          _id: _id,
        };
        result =
          await InventoryModel.productSerialRequest.updateInventoryProductSerailRequest(
            conditions,
            params
          );
        if (result.code == 1) {
          var params = {};
          params["$set"] = {};
          params["$push"] = {};

          params["$set"].currentStatus = "in stock";
          params["$push"].movements = [
            {
              status: "in stock",
              docNumber:
                "Deleted from" +
                " : " +
                productSerialRequestResult.data[0].inventoryRequest
                  .documentNumber,
              movementDateTime: Date.now(),
              createdBy: {
                user_id: userData._id,
                firstname: userData.firstname,
                lastname: userData.lastname,
              },
            },
          ];

          const productSerialconditions = {
            _id: productSerial_id,
          };

          result =
            await InventoryModel.productSerial.updateInventoryProductSerailNumber(
              productSerialconditions,
              params
            );
          result =
            await InventoryModel.productSerialRequest.deleteProductSerialRequest(
              {
                _id: _id,
              }
            );
        }
      } else {
        var params = {};
        params["$pull"] = {
          inventoryProductSerial: { _id: { $in: inventoryProductSerial_id } },
        };

        const conditions = {
          _id: _id,
        };
        result =
          await InventoryModel.productSerialRequest.updateInventoryProductSerailRequest(
            conditions,
            params
          );
        if (result.code == 1) {
          var params = {};
          params["$set"] = {};
          params["$push"] = {};

          params["$set"].currentStatus = "in stock";
          params["$push"].movements = [
            {
              status: "in stock",
              docNumber:
                "Deleted from" +
                " : " +
                productSerialRequestResult.data[0].inventoryRequest
                  .documentNumber,
              movementDateTime: Date.now(),
              createdBy: {
                user_id: userData._id,
                firstname: userData.firstname,
                lastname: userData.lastname,
              },
            },
          ];

          const productSerialconditions = {
            _id: productSerial_id,
          };

          result =
            await InventoryModel.productSerial.updateInventoryProductSerailNumber(
              productSerialconditions,
              params
            );
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

