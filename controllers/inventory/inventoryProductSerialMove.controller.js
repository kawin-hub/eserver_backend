// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let ProductModel = require("../../models/Products");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Insert/Post

exports.insertProductSerialMove = async (req, res) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      inventoryMove_id: "required",
      inventoryLocation_origin_id: "required",
      inventoryLocation_destination_id: "required",
      productModel_id: "required",
      inventoryProductSerials: "required",
    });

    const matched = await validation.check();
    if (matched) {
      const {
        inventoryMove_id,
        inventoryLocation_origin_id,
        inventoryLocation_destination_id,
        productModel_id,
        inventoryProductSerials,
        jobStatus,
      } = req.body;

      const userData = req.body.authData.userInfo.userData;

      var InventoryMoveModel = InventoryModel.move;
      var InventoryLocationModel = InventoryModel.location;
      var InventoryProductSerialModel = InventoryModel.productSerial;

      var inventoryProductSerial_ids = [];

      for (var i = 0; i < inventoryProductSerials.length; i++) {
        inventoryProductSerial_ids[i] = inventoryProductSerials[i]._id;
      }

      var [
        inventoryMoveResult,
        inventoryLocationResult,
        productModelResult,
        inventoryProductSerialResult,
      ] = await Promise.all([
        InventoryMoveModel.getInventoryMoveById(
          {
            _id: inventoryMove_id,
          },
          {
            _id: 1,
            documentNumber: 1,
            dueDate: 1,
          }
        ),
        InventoryLocationModel.getInventoryLocationbyArrayId(
          [inventoryLocation_origin_id, inventoryLocation_destination_id],
          {
            _id: 1,
            name: 1,
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
        InventoryProductSerialModel.getProducSerialtsbyArrayId(
          inventoryProductSerial_ids,
          {
            _id: 1,
            serialNumber: 1,
          }
        ),
      ]);

      if (
        inventoryMoveResult.code == 1 &&
        productModelResult.code == 1 &&
        inventoryLocationResult.code == 1 &&
        inventoryProductSerialResult.code == 1
      ) {
        var insertProductSerialMoveparams = {
          inventoryMove: {
            move_id: inventoryMoveResult.data._id,
            documentNumber: inventoryMoveResult.data.documentNumber,
            dueDate: inventoryMoveResult.data.dueDate,
          },
          productModel: {
            productModel_id: productModelResult.data._id,
            name: productModelResult.data.name,
            modelCode: productModelResult.data.modelCode,
          },
          inventoryLocation: {
            origin: {
              location_id:
                inventoryLocationResult.data[0]._id ==
                inventoryLocation_origin_id
                  ? inventoryLocationResult.data[0]._id
                  : inventoryLocationResult.data[1]._id,
              name:
                inventoryLocationResult.data[0]._id ==
                inventoryLocation_origin_id
                  ? inventoryLocationResult.data[0].name
                  : inventoryLocationResult.data[1].name,
            },
            destination: {
              location_id:
                inventoryLocationResult.data[0]._id ==
                inventoryLocation_destination_id
                  ? inventoryLocationResult.data[0]._id
                  : inventoryLocationResult.data[1]._id,
              name:
                inventoryLocationResult.data[0]._id ==
                inventoryLocation_destination_id
                  ? inventoryLocationResult.data[0].name
                  : inventoryLocationResult.data[1].name,
            },
          },
          InventoryProductSerial: inventoryProductSerialResult.data,
          jobStatus: typeof jobStatus != "undefined" ? jobStatus : "",
          movements: [
            {
              status: "move",
              docNumber: inventoryMoveResult.data.documentNumber,
            },
          ],
          createdBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        };

        var productSerialMoveModel = InventoryModel.productSerialMove;
        result = await productSerialMoveModel.insertProductSerialMove(
          insertProductSerialMoveparams
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
