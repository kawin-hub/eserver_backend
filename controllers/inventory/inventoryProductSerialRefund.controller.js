// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let ProductModel = require("../../models/Products");
let { general, upload } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { ObjectId } = require("mongodb");

exports.insertProductSerialRefund = async (req, res) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      refund_id: "required",
      request_id: "required",
      location_id: "required",
      productModel_id: "required",
      inventoryProductSerials: "required",
    });

    const matched = await validation.check();
    if (matched) {
      const {
        refund_id,
        request_id,
        productModel_id,
        location_id,
        inventoryProductSerials,
        status,
      } = req.body;

      const userData = req.body.authData?.userInfo?.userData;

      var inventoryProductSerial_ids = [];

      for (var i = 0; i < inventoryProductSerials.length; i++) {
        inventoryProductSerial_ids[i] = inventoryProductSerials[i]._id;
      }
      var [
        inventoryRefundResult,
        inventoryRequestResult,
        productModelResult,
        inventoryProductSerialResult,
        inventoryLocationResult,
      ] = await Promise.all([
        InventoryModel.refund.getInventoryRefundById(
          { _id: refund_id },
          {
            _id: 1,
            documentNumber: 1,
          }
        ),
        InventoryModel.request.getInventoryRequestById(
          { _id: request_id },
          {
            _id: 1,
            documentNumber: 1,
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
        InventoryModel.productSerial.getProductSerialsbyArrayId(
          inventoryProductSerial_ids,
          {
            _id: 1,
            serialNumber: 1,
          }
        ),
        InventoryModel.location.getInventoryLocationById(
          { _id: location_id },
          {
            _id: 1,
            name: 1,
          }
        ),
      ]);
      if (
        inventoryRefundResult.code == 1 &&
        inventoryRequestResult.code == 1 &&
        productModelResult.code == 1 &&
        inventoryProductSerialResult.code == 1 &&
        inventoryLocationResult.code == 1
      ) {
        var insertProductSerialRefundparams = {
          inventoryRefund: {
            refund_id: inventoryRefundResult.data._id,
            documentNumber: inventoryRefundResult.data.documentNumber,
          },

          inventoryRequest: {
            request_id: inventoryRequestResult.data._id,
            documentNumber: inventoryRequestResult.data.documentNumber,
          },

          inventoryLocation: {
            location_id: inventoryLocationResult.data._id,
            name: inventoryLocationResult.data.name,
          },

          productModel: {
            productModel_id: productModelResult.data._id,
            modelCode: productModelResult.data.modelCode,
            name: productModelResult.data.name,
          },

          status: status,
          inventoryProductSerial: inventoryProductSerialResult.data,
          createdBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        };
        result =
          await InventoryModel.productSerialRefund.insertProductSerialRefund(
            insertProductSerialRefundparams
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

exports.getProductSerialRefundByRefundId = async (req, res) => {
  var result = new DataResponse();
  const { _id } = req.query;
  try {
    var InventoryProductSerialRefund = InventoryModel.productSerialRefund;
    result =
      await InventoryProductSerialRefund.getProductSerialRefundByConditions({
        "inventoryRefund.refund_id": new Object(_id),
      });
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};
