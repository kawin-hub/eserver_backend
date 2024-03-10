// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");

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
