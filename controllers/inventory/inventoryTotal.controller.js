// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { ObjectId } = require("mongodb");

let ProductModel = require("../../models/Products");

// 👉 Get all or by ID

exports.getInventoryTotals = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id } = req.query;

    var InventoryTotalModel = InventoryModel.total;

    if (typeof _id != "undefined") {
      result = await InventoryTotalModel.getInventoryTotalById({
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

      result = await InventoryTotalModel.getAllInventoryTotals(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.getProductTotal = async (req, res) => {
  var result = new DataResponse();

  try {
    var { inventory_id, txtSearch, status } = req.query;
    var match = { currentStatus: "in stock" };
    if (inventory_id) {
      match = {
        currentStatus: "in stock",
        "inventoryLocation.location_id": new ObjectId(inventory_id),
      };
    }

    var pageOption = general.checkPageAndLimit(req.query.page, req.query.limit);

    var params = {
      match: match,
      page: pageOption.page,
      limit: pageOption.limit,
      queryCondition: {},
    };

    var orConditions;

    if (typeof txtSearch !== "undefined") {
      const searchRegex = new RegExp(txtSearch, "i");
      orConditions = [
        {
          "productModel.modelCode": searchRegex,
        },
        {
          "productModel.name": searchRegex,
        },
      ];
      params.queryCondition["$or"] = orConditions;
    }

    result = await InventoryModel.productSerial.getInventoryProductTotal(
      params
    );
    if (result.code == 1) {
      var productIds = [];
      for (var i = 0; i < result.data.documents.length; i++) {
        productIds[i] = result.data.documents[i]._id.productModel_id;
      }
      productIds = [...new Set(productIds.map((id) => id.toString()))].map(
        (id) => new ObjectId(id)
      );

      const productModelResult = await ProductModel.getProductsbyArrayId(
        productIds,
        { _id: 1, status: 1 }
      );

      for (var i = 0; i < result.data.documents.length; i++) {
        for (var k = 0; k < productModelResult.data.length; k++) {
          if (
            productModelResult.data[k]._id.equals(
              result.data.documents[i]._id.productModel_id
            )
          ) {
            result.data.documents[i].status = productModelResult.data[k].status;
            break;
          }
        }
      }
    } else {
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
};

//getProductCountInInventories
