// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let AccountModel = require("../../models/Account");
let ProductModel = require("../../models/Products");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Insert/Post

exports.insertProductSerial = async (req, res) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      serialNumber: "required",
      expense_id: "required",
      productModel_id: "required",
      inventoryLocation_id: "required",
      inventoryLot_id: "required",
    });

    const matched = await validation.check();
    if (matched) {
      const {
        expense_id,
        productModel_id,
        serialNumber,
        inventoryLocation_id,
        inventoryLot_id,
      } = req.body;

      const userData = req.body.authData.userInfo.userData;

      var AccountExpenseModel = AccountModel.expense;
      var InventoryLocationModel = InventoryModel.location;
      var InventoryLotModel = InventoryModel.lot;

      var [
        accountExpenseResult,
        productModelResult,
        inventoryLocationResult,
        inventoryLotResult,
      ] = await Promise.all([
        AccountExpenseModel.getAccountExpenseById(
          {
            _id: expense_id,
          },
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
        InventoryLocationModel.getInventoryLocationById(
          {
            _id: inventoryLocation_id,
          },
          {
            _id: 1,
            name: 1,
          }
        ),
        InventoryLotModel.getInventoryLotById(
          {
            _id: inventoryLot_id,
          },
          {
            _id: 1,
            lotNumber: 1,
          }
        ),
      ]);

      if (
        accountExpenseResult.code == 1 &&
        productModelResult.code == 1 &&
        inventoryLocationResult.code == 1 &&
        inventoryLotResult.code == 1
      ) {
        var insertProductSerialparams = {
          serialNumber: serialNumber,
          accountExpense: {
            expense_id: accountExpenseResult.data._id,
            documentNumber: accountExpenseResult.data.documentNumber,
          },
          productModel: {
            productModel_id: productModelResult.data._id,
            name: productModelResult.data.name,
            modelCode: productModelResult.data.modelCode,
          },
          inventoryLocation: {
            location_id: inventoryLocationResult.data._id,
            name: inventoryLocationResult.data.name,
          },
          inventoryLot: {
            lot_id: inventoryLotResult.data._id,
            lotNumber: inventoryLotResult.data.lotNumber,
          },
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
