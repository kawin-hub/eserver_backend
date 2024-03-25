// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let ProductModel = require("../../models/Products");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Get all or by ID

exports.getInventoryRequests = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id } = req.query;

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
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

// 👉 Post/Insert

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
