// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let AccountModel = require("../../models/Account");
let ProductModel = require("../../models/Products");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Post/Insert

exports.insertProductSerial = async (req, res) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      serialNumber: "required",
      productModel_id: "required",
      location_id: "required",
      lot_id: "required",
    });

    const matched = await validation.check();
    if (matched) {
      const { productModel_id, serialNumber, location_id, lot_id } = req.body;

      const userData = req.body.authData.userInfo.userData;

      var [inventoryLotResult, productModelResult, inventoryLocationResult] =
        await Promise.all([
          InventoryModel.lot.getInventoryLotById({
            _id: lot_id,
          }),
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
          InventoryModel.location.getInventoryLocationById(
            {
              _id: location_id,
            },
            {
              _id: 1,
              name: 1,
            }
          ),
        ]);

      if (
        inventoryLotResult.code == 1 &&
        productModelResult.code == 1 &&
        inventoryLocationResult.code == 1
      ) {
        const accountExpense = inventoryLotResult.data.accountExpense;

        var insertProductSerialparams = {
          lot_id: lot_id,
          accountExpense: accountExpense,
          productModel: {
            productModel_id: productModelResult.data._id,
            name: productModelResult.data.name,
            modelCode: productModelResult.data.modelCode,
          },
          inventoryLocation: {
            location_id: inventoryLocationResult.data._id,
            name: inventoryLocationResult.data.name,
          },
          serialNumber: serialNumber,
          movements: [
            {
              status: "create lot",
              docNumber: inventoryLotResult.data.lotNumber,
              movementDateTime: inventoryLotResult.data.createdAt,
            },
            {
              status: "in stock",
              docNumber: inventoryLotResult.data.lotNumber,
            },
          ],
          createdBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        };

        var productSerialModel = InventoryModel.productSerial;
        result = await productSerialModel.insertProductSerial(
          insertProductSerialparams
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

// 👉 Delete

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
