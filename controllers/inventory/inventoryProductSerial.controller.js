let InventoryModel = require("../../models/Inventory");
let ProductModel = require("../../models/Products");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

exports.insertProductSerial = async (req, res) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      serialNumber: "required",
      productModel_id: "required",
      inventoryLocation_id: "required",
      inventoryLot_id: "required",
    });

    const matched = await validation.check();
    if (matched) {
      const {
        productModel_id,
        serialNumber,
        inventoryLocation_id,
        inventoryLot_id,
      } = req.body;

      var [productModelResult, inventoryLocationResult, inventoryLotResult] =
        await Promise.all([
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
          InventoryModel.getInventoryLocationById({
            _id: inventoryLocation_id,
          }),
          InventoryModel.getInventoryLotById({
            _id: inventoryLot_id,
          }),
        ]);

      if (productModelResult.code == 1) {
        var insertProductSerialparams = {
          serialNumber: serialNumber,
          productModel: {
            _id: productModelResult.data._id,
            name: productModelResult.data.name,
            modelCode: productModelResult.data.modelCode,
          },
          inventoryLocation: {
            _id: inventoryLocationResult.data._id,
            name: inventoryLocationResult.data.name,
          },
          inventoryLot: {
            _id: inventoryLotResult.data._id,
            lotNumber: inventoryLotResult.data.lotNumber,
          },
          currentStatus: "in stock",
          movements: [
            {
              status: "create lot",
              docNumber: inventoryLotResult.data.lotNumber,
              movementDateTime: inventoryLotResult.data.createdAt,
            },
            {
              status: "in stock",
              docNumber: inventoryLotResult.lotNumber,
            },
          ],
        };

        var productSerialModel = InventoryModel.productSerial;
        result = await productSerialModel.insertProductSerial(
          insertProductSerialparams
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

exports.deleteProductSerial = async (req, res) => {
  const { _id } = req.query;
  try {
    var result = new DataResponse();
    var productSerialModel = InventoryModel.productSerial;

    if (typeof _id != "undefined") {
      var params = {
        _id: _id,
      };
      result = await productSerialModel.deleteOneProductSerial(params);
    } else {
      result.doError(2, "_id is required.");
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
};
