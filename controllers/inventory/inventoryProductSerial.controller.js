// 👉 Inventory model
let { general, upload } = require("../../middleware");
let InventoryModel = require("../../models/Inventory");
let AccountModel = require("../../models/Account");
let ProductModel = require("../../models/Products");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { ObjectId } = require("mongodb");
const { status } = require("express/lib/response");

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
      const {
        productModel_id,
        serialNumber,
        location_id,
        lot_id,
        currentStatus,
      } = req.body;

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
        // check serails quantity

        var updateSuccess = false;

        const targetId = new ObjectId(productModel_id);
        const index = inventoryLotResult.data.productModel.findIndex(
          (product) => product._id.equals(targetId)
        );
        var productRequestDetail = inventoryLotResult.data.productModel[index];
        var productSerialModel = InventoryModel.productSerial;
        var serialAmount =
          await productSerialModel.getProductSerialByConditions(
            {
              lot_id: new ObjectId(lot_id),
              "productModel.productModel_id": new ObjectId(productModel_id),
            },
            {
              _id: -1,
            }
          );
        var serialAlreadyInserted = serialAmount.data.length;

        if (productRequestDetail.quantity > serialAlreadyInserted) {
          // check amount over
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
            currentStatus: currentStatus,
            active: false,
            movements: [
              {
                status: "create lot",
                docNumber: inventoryLotResult.data.lotNumber,
                movementDateTime: inventoryLotResult.data.createdAt,
                inventoryLocation: {
                  location_id: inventoryLocationResult.data._id,
                  name: inventoryLocationResult.data.name,
                },
                createdBy: {
                  user_id: userData._id,
                  firstname: userData.firstname,
                  lastname: userData.lastname,
                },
              },
              {
                status: "in stock",
                docNumber: inventoryLotResult.data.lotNumber,
                movementDateTime: Date.now(),
                inventoryLocation: {
                  location_id: inventoryLocationResult.data._id,
                  name: inventoryLocationResult.data.name,
                },
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

          result = await productSerialModel.insertProductSerial(
            insertProductSerialparams
          );

          if (result.code == 1) {
            if (!inventoryLotResult.data.inventoryLocation) {
              const conditions = {
                _id: new ObjectId(lot_id),
              };
              var params = {};
              params["$set"] = {};
              params["$set"].inventoryLocation = {
                location_id: inventoryLocationResult.data._id,
                name: inventoryLocationResult.data.name,
              };

              await InventoryModel.lot.updateLot(conditions, params);
            }
            var currentSerialAmount = serialAlreadyInserted + 1;
            result.data = {
              productModel_id: productModel_id,
              allow: true,
              left: productRequestDetail.quantity - currentSerialAmount,
              inserted: currentSerialAmount,
              requestAmount: productRequestDetail.quantity,
              updateData: result.data,
            };
            updateSuccess = true;
          }
        } else {
          result.doError(10, "This product is already done!");
        }

        if (!updateSuccess) {
          result.data = {
            productModel_id: productModel_id,
            allow: false,
            left: 0,
            inserted: serialAlreadyInserted,
            requestAmount: productRequestDetail.quantity,
          };
        }
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
  const { _id } = req.body;
  try {
    var result = new DataResponse();
    var productSerialModel = InventoryModel.productSerial;

    if (typeof _id != "undefined") {
      var params = {
        _id: _id,
        active: false,
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

exports.getProductSerialAll = async (req, res, next) => {
  var result = new DataResponse();
  try {
    const {
      _id,
      txtSearch,
      inventoryStatus,
      inventoryLocation,
      lotNumber,
      serialNumber,
      lot_id,
    } = req.query;

    if (typeof getby != "undefined" && getby == "serialNumber") {
      if (typeof serialNumber != "undefined") {
        var params = {
          serialNumber: serialNumber,
        };
        result = await ProductModel.getProductSerialByConditions(params);
      }
    }

    if (typeof _id != "undefined") {
      result = await InventoryModel.productSerial.getProductSerialsbyParams({
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
            serialNumber: searchRegex,
          },
          {
            "productModel.modelCode": searchRegex,
          },
          {
            "productModel.name": searchRegex,
          },
          {
            "inventoryLocation.name": searchRegex,
          },
        ];
        params.queryCondition["$or"] = orConditions;
      }

      if (typeof inventoryStatus !== "undefined") {
        params.queryCondition["currentStatus"] = inventoryStatus;
      }

      if (typeof inventoryLocation !== "undefined") {
        params.queryCondition["inventoryLocation.name"] = inventoryLocation;
      }

      if (typeof lotNumber !== "undefined") {
        params.queryCondition["lot_id"] = lotNumber;
      }

      result = await InventoryModel.productSerial.getAllProductSerial(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.scanOutProduct = async (req, res) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      serialNumber: "required",
      requestType: "required",
      location: "required",
    });

    const matched = await validation.check();
    if (matched) {
      const userData = req.body.authData.userInfo.userData;
      //check Product exist

      var {
        _id,
        serialNumber,
        requestType,
        location,
        locationName,
        quotation_id,
        documentNumber,
        productModel,
      } = req.body;

      var productSerialResult =
        await InventoryModel.productSerial.getProductSerialByConditions(
          {
            serialNumber: serialNumber,
            "inventoryLocation.location_id": location._id,
          },
          {
            _id: 1,
            lot_id: 1,
            productModel: 1,
            inventoryLocation: 1,
            serialNumber: 1,
            currentStatus: 1,
            active: 1,
          }
        );
      //check product exist in inventory
      if (
        productSerialResult.code == 1 &&
        productSerialResult.data?.length > 0
      ) {
        productSerialResult = productSerialResult.data[0];

        result = checkAvalibleProduct(productSerialResult);
        if (result.code == 1) {
          result = await checkInventoryRequestAmount(
            userData,
            _id,
            productSerialResult.productModel.productModel_id,
            {
              _id: productSerialResult._id,
              serialNumber: productSerialResult.serialNumber,
            }
          );

          if (result.code == 1 && result.data.allow) {
            // update product here.
            var params = {};
            params["$set"] = {};
            params["$push"] = {};

            params["$set"].currentStatus = requestType;
            params["$push"].movements = [
              {
                status: requestType,
                docNumber: documentNumber,
                inventoryLocation: {
                  location_id: location._id,
                  name: location.name,
                },
                movementDateTime: Date.now(),
                createdBy: {
                  user_id: userData._id,
                  firstname: userData.firstname,
                  lastname: userData.lastname,
                },
              },
            ];

            const conditions = {
              _id: productSerialResult._id,
            };

            await InventoryModel.productSerial.updateInventoryProductSerailNumber(
              conditions,
              params
            );
          }
        }
      } else {
        // Serail number not found in  this inventory!
        result.doError(
          5,
          "This serial number isn't found in the selected inventory!"
        );
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
    result.doError(0, error);
  }

  res.json(result);
};

const checkAvalibleProduct = (productSerialResult) => {
  var result = new DataResponse();
  if (!productSerialResult.active) {
    result.doError(9, "This product is inactivated!");
  } else if (productSerialResult.currentStatus !== "in stock") {
    result.doError(8, "This product is already in use!");
  } else {
    result.doSuccess(1, "This product is available!");
  }
  return result;
};

const checkInventoryRequestAmount = async (
  userData,
  inventoryRequests_id,
  productModel_id,
  serialInfo
) => {
  var result = new DataResponse();
  result.data = { allow: false };
  try {
    const [inventoryRequestResult, inventorySerialRequestResult] =
      await Promise.all([
        InventoryModel.request.getInventoryRequestById(
          {
            _id: inventoryRequests_id,
            "productModel._id": productModel_id,
          },
          {
            _id: 1,
            documentNumber: 1,
            dueDate: 1,
            requestType: 1,
            estimatedReturnDate: 1,
            remark: 1,
            productModel: { $elemMatch: { _id: productModel_id } },
          }
        ),
        InventoryModel.productSerialRequest.getProductSerialRequestByRequestId({
          "inventoryRequest.request_id": inventoryRequests_id,
          "productModel.productModel_id": productModel_id,
        }),
      ]);
    if (inventoryRequestResult.code == 2) {
      result.doError(2, "This product isn't in request product list!");
    } else if (inventoryRequestResult.code == 1) {
      var productOver = false;
      const productDetail = inventoryRequestResult.data?.productModel[0];
      var requestAmount = productDetail.quantity;
      var serialRequestAmount = 0;

      if (inventorySerialRequestResult.code == 2) {
        // insert
        var serialRequestParams = {
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
            productModel_id: productDetail._id,
            name: productDetail.name,
            modelCode: productDetail.modelCode,
          },
          inventoryProductSerial: [
            {
              productSerial_id: serialInfo._id,
              serialNumber: serialInfo.serialNumber,
            },
          ],
          createdBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
          updatedBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        };

        if (requestAmount > 0) {
          //insert
          result =
            await InventoryModel.productSerialRequest.insertProductSerialRequest(
              serialRequestParams
            );
          serialRequestAmount = 1;
          result.doSuccess(1, "Serial number was inserted!");
          // เพิ่มตรงนี้ รอคุณกวินแก้ไข
        } else {
          productOver = true;
        }
      } else if (inventorySerialRequestResult.code == 1) {
        serialRequestAmount = inventorySerialRequestResult.data
          .inventoryProductSerial.length
          ? inventorySerialRequestResult.data.inventoryProductSerial.length
          : 0;

        if (requestAmount > serialRequestAmount) {
          //Update here.
          var params = {};
          params["$push"] = {};

          params["$push"].inventoryProductSerial = [
            {
              productSerial_id: serialInfo._id,
              serialNumber: serialInfo.serialNumber,
            },
          ];

          const conditions = {
            _id: inventorySerialRequestResult.data._id,
          };

          result =
            await InventoryModel.productSerialRequest.updateInventoryProductSerailRequest(
              conditions,
              params,
              {
                new: true,
                projection: {
                  _id: 1,
                  inventoryProductSerial: 1,
                  productModel: 1,
                },
              }
            );

          if (result.code == 1) {
            serialRequestAmount += 1;
          }
        } else {
          productOver = true;
        }
      }

      if (productOver) {
        result.data = {
          allow: false,
          requestAmount: requestAmount,
          serialRequestAmount: serialRequestAmount,
          left: requestAmount - serialRequestAmount,
        };
        result.doError(10, "This product is already done!");
      } else {
        // all success!

        result.data = {
          allow: true,
          requestAmount: requestAmount,
          serialRequestAmount: serialRequestAmount,
          left: requestAmount - serialRequestAmount,
          updatedData: result.data,
        };
        result.doSuccess(1);
      }
    }
  } catch (error) {
    console.log(error);
    result.doError(0, error);
  }

  return result;
};

exports.getProductSerialByLotIds = async (req, res) => {
  var result = new DataResponse();

  try {
    const { lot_id } = req.query;

    if (typeof lot_id != "undefined") {
      result = await InventoryModel.productSerial.getProductSerialByConditions(
        { lot_id: new ObjectId(lot_id) },
        { serialNumber: 1, productModel: 1, active: 1 }
      );
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

exports.scanRefundProduct = async (req, res) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      serialNumber: "required",
    });

    const matched = await validation.check();
    if (matched) {
      const userData = req.body.authData.userInfo.userData;
      var { _id, serialNumber, location, documentNumber, inventoryRequest } =
        req.body;
      var productSerialResult =
        await InventoryModel.productSerial.getProductSerialByConditions(
          {
            serialNumber: serialNumber,
            "inventoryLocation.location_id": location._id,
          },
          {
            _id: 1,
            lot_id: 1,
            productModel: 1,
            inventoryLocation: 1,
            serialNumber: 1,
            currentStatus: 1,
            active: 1,
          }
        );
      if (
        productSerialResult.code == 1 &&
        productSerialResult.data?.length > 0
      ) {
        if (
          productSerialResult.code == 1 &&
          productSerialResult.data[0].currentStatus == "sell"
        ) {
          productSerialResult = productSerialResult.data[0];
          result = checkAvalibleProductRefund(productSerialResult);
          if (result.code == 1) {
            var alreadyFoundSerial = false;
            var productSerialRequestResult =
              await InventoryModel.productSerialRequest.getProductSerialRequestByConditions(
                {
                  "inventoryRequest.request_id": inventoryRequest.request_id,
                }
              );

            for (var i = 0; i < productSerialRequestResult.data.length; i++) {
              for (
                var k = 0;
                k <
                productSerialRequestResult.data[i].inventoryProductSerial
                  .length;
                k++
              ) {
                var productSerial =
                  productSerialRequestResult.data[i].inventoryProductSerial[k]
                    .serialNumber;

                if (
                  productSerialResult.serialNumber == productSerial.toString()
                ) {
                  result = await checkInventoryRefundAmount(
                    userData,
                    _id,
                    productSerialResult.productModel.productModel_id,
                    {
                      _id: productSerialResult._id,
                      serialNumber: productSerialResult.serialNumber,
                    }
                  );

                  if (result.code == 1 && result.data.allow) {
                    // update product here.
                    var params = {};
                    params["$set"] = {};
                    params["$push"] = {};

                    params["$set"].currentStatus = "in stock";
                    params["$push"].movements = [
                      {
                        status: "in stock",
                        docNumber: "RF" + ":" + documentNumber,
                        inventoryLocation: {
                          location_id: location._id,
                          name: location.name,
                        },
                        movementDateTime: Date.now(),
                        createdBy: {
                          user_id: userData._id,
                          firstname: userData.firstname,
                          lastname: userData.lastname,
                        },
                      },
                    ];

                    const conditions = {
                      _id: productSerialResult._id,
                    };
                    await InventoryModel.productSerial.updateInventoryProductSerailNumber(
                      conditions,
                      params
                    );

                    var productSerialRequest_id =
                      productSerialRequestResult.data[i]._id;

                    productSerialRequestResult.data[
                      i
                    ].inventoryProductSerial.splice(k, 1);

                    var productLeft =
                      productSerialRequestResult.data[i].inventoryProductSerial;

                    await InventoryModel.productSerialRequest.updateInventoryProductSerailRequest(
                      {
                        _id: productSerialRequest_id,
                      },
                      {
                        $set: {
                          inventoryProductSerial: productLeft,
                        },
                      }
                    );

                    alreadyFoundSerial = true;
                    break;
                  }
                }
                if (alreadyFoundSerial) {
                  result.doSuccess(1);
                  break;
                } else {
                  result.doError(12, "No serial number found on the receipt!");
                }
              }

              /* var deleteProductSerialRequestparams = {
                "productModel.name": "Indoor01",
              };

              const conditionsDelete = {
                productSerial_id: new ObjectId("67245f5fd961e6cd57e1b630"),
              };
              await InventoryModel.productSerialRequest.updateInventoryProductSerailRequest(
                conditionsDelete,
                deleteProductSerialRequestparams
              ); */
            }
          }
        } else {
          result.doError(7, "The product is no longer in the sell status!");
        }
      } else {
        // Serail number not found in  this inventory!
        result.doError(
          5,
          "This serial number isn't found in the selected inventory!"
        );
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (e) {
    console.log(e);
    result.doError(0, e);
  }
  res.json(result);
};

const checkAvalibleProductRefund = (productSerialResult) => {
  var result = new DataResponse();
  if (!productSerialResult.active) {
    result.doError(9, "This product is inactivated!");
  } else if (productSerialResult.currentStatus !== "sell") {
    result.doSuccess(8, "This product is no longer available for sale!");
  } else if (productSerialResult.currentStatus === "sell") {
    result.doError(1, "This product is available!");
  }

  return result;
};

const checkInventoryRefundAmount = async (
  userData,
  inventoryRefund_id,
  productModel_id,
  serialInfo
) => {
  var result = new DataResponse();
  result.data = { allow: false };
  try {
    const [inventoryRefundResult, inventorySerialRefundResult] =
      await Promise.all([
        InventoryModel.refund.getInventoryRefundById(
          {
            _id: inventoryRefund_id,
            "productModel._id": productModel_id,
          },
          {
            _id: 1,
            documentNumber: 1,
            status: 1,
            productModel: { $elemMatch: { _id: productModel_id } },
            inventoryRequest: 1,
            inventoryLocation: 1,
          }
        ),
        InventoryModel.productSerialRefund.getProductSerialRequestByRefundId({
          "inventoryRefund.refund_id": inventoryRefund_id,
          "productModel.productModel_id": productModel_id,
        }),
      ]);
    if (inventoryRefundResult.code == 2) {
      result.doError(2, "This product isn't in request product list!");
    } else if (inventoryRefundResult.code == 1) {
      var productOver = false;
      const productDetail = inventoryRefundResult.data?.productModel[0];

      var refundAmount = productDetail.quantity;
      var serialRefundAmount = 0;
      if (inventorySerialRefundResult.code == 2) {
        var insertProductSerialRefundparams = {
          inventoryRefund: {
            refund_id: inventoryRefundResult.data._id,
            documentNumber: inventoryRefundResult.data.documentNumber,
          },

          inventoryRequest: {
            request_id: inventoryRefundResult.data.inventoryRequest._id,
            documentNumber:
              inventoryRefundResult.data.inventoryRequest.documentNumber,
          },

          inventoryLocation: {
            location_id:
              inventoryRefundResult.data.inventoryLocation.location_id,
            name: inventoryRefundResult.data.inventoryLocation.name,
          },

          productModel: {
            productModel_id: productDetail._id,
            modelCode: productDetail.modelCode,
            name: productDetail.name,
          },

          inventoryProductSerial: [
            {
              productSerial_id: serialInfo._id,
              serialNumber: serialInfo.serialNumber,
            },
          ],
          createdBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
          updatedBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        };

        if (refundAmount > 0) {
          result =
            await InventoryModel.productSerialRefund.insertProductSerialRefund(
              insertProductSerialRefundparams
            );
          serialRefundAmount = 1;
          result.doSuccess(1, "Serial number was inserted!");
        } else {
          productOver = true;
        }
      } else if (inventorySerialRefundResult.code == 1) {
        serialRefundAmount = inventorySerialRefundResult.data
          .inventoryProductSerial.length
          ? inventorySerialRefundResult.data.inventoryProductSerial.length
          : 0;

        if (refundAmount > serialRefundAmount) {
          //Update here.
          var params = {};
          params["$push"] = {};

          params["$push"].inventoryProductSerial = [
            {
              productSerial_id: serialInfo._id,
              serialNumber: serialInfo.serialNumber,
            },
          ];

          const conditions = {
            _id: inventorySerialRefundResult.data._id,
          };

          result =
            await InventoryModel.productSerialRefund.updateInventoryProductSerailRefund(
              conditions,
              params,
              {
                new: true,
                projection: {
                  _id: 1,
                  inventoryProductSerial: 1,
                  productModel: 1,
                },
              }
            );

          if (result.code == 1) {
            serialRefundAmount += 1;
          }
        } else {
          productOver = true;
        }
      }
      if (productOver) {
        result.data = {
          allow: false,
          refundAmount: refundAmount,
          serialRefundAmount: serialRefundAmount,
          left: refundAmount - serialRefundAmount,
        };
        result.doError(10, "This product is already done!");
      } else {
        // all success!
        result.data = {
          allow: true,
          refundAmount: refundAmount,
          serialRefundAmount: serialRefundAmount,
          left: refundAmount - serialRefundAmount,
          updatedData: result.data,
        };

        result.doSuccess(1);
      }
    }
  } catch (e) {
    console.log(e);
    result.doError(0, e);
  }
  return result;
};

exports.scanMoveProduct = async (req, res) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      serialNumber: "required",
      location: "required",
    });

    const matched = await validation.check();
    if (matched) {
      const userData = req.body.authData.userInfo.userData;
      //check Product exist

      var { _id, serialNumber, requestType, location, documentNumber } =
        req.body;

      var productSerialResult =
        await InventoryModel.productSerial.getProductSerialByConditions(
          {
            serialNumber: serialNumber,
            "inventoryLocation.location_id": location.origin._id,
          },
          {
            _id: 1,
            lot_id: 1,
            productModel: 1,
            inventoryLocation: 1,
            serialNumber: 1,
            currentStatus: 1,
            active: 1,
          }
        );
      //check product exist in inventory

      if (
        productSerialResult.code == 1 &&
        productSerialResult.data?.length > 0
      ) {
        productSerialResult = productSerialResult.data[0];

        result = checkAvalibleProductMove(productSerialResult);
        if (result.code == 1) {
          result = await checkInventoryMoveAmount(
            userData,
            _id,
            productSerialResult.productModel.productModel_id,
            {
              _id: productSerialResult._id,
              serialNumber: productSerialResult.serialNumber,
            }
          );

          if (result.code == 1 && result.data.allow) {
            // update product here.
            var params = {};
            params["$set"] = {};
            params["$push"] = {};

            params["$set"].inventoryLocation = {
              location_id: location.destination._id,
              name: location.destination.name,
            };
            params["$push"].movements = [
              {
                status: "in stock",
                docNumber: "move" + " : " + documentNumber,
                inventoryLocation: {
                  location_id: location.destination._id,
                  name: location.destination.name,
                },
                movementDateTime: Date.now(),
                createdBy: {
                  user_id: userData._id,
                  firstname: userData.firstname,
                  lastname: userData.lastname,
                },
              },
            ];

            const conditions = {
              _id: productSerialResult._id,
            };

            await InventoryModel.productSerial.updateInventoryProductSerailNumber(
              conditions,
              params
            );
          }
        }
      } else {
        // Serail number not found in  this inventory!
        result.doError(
          5,
          "This serial number isn't found in the selected inventory!"
        );
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
    result.doError(0, error);
  }

  res.json(result);
};

const checkAvalibleProductMove = (productSerialResult) => {
  var result = new DataResponse();
  if (!productSerialResult.active) {
    result.doError(9, "This product is inactivated!");
  } else if (productSerialResult.currentStatus !== "in stock") {
    result.doError(8, "This product is already in use!");
  } else {
    result.doSuccess(1, "This product is available!");
  }

  return result;
};

const checkInventoryMoveAmount = async (
  userData,
  inventoryMove_id,
  productModel_id,
  serialInfo
) => {
  var result = new DataResponse();
  result.data = { allow: false };
  try {
    const [inventoryMoveResult, inventorySerialMoveResult] = await Promise.all([
      InventoryModel.move.getInventoryMoveById(
        {
          _id: inventoryMove_id,
          "productModel._id": productModel_id,
        },
        {
          _id: 1,
          documentNumber: 1,
          dueDate: 1,
          inventoryLocation: 1,
          productModel: { $elemMatch: { _id: productModel_id } },
        }
      ),
      InventoryModel.productSerialMove.getProductSerialMoveByMoveId({
        "inventoryMove.move_id": inventoryMove_id,
        "productModel.productModel_id": productModel_id,
      }),
    ]);
    if (inventoryMoveResult.code == 2) {
      result.doError(2, "This product isn't in request product list!");
    } else if (inventoryMoveResult.code == 1) {
      var productOver = false;
      const productDetail = inventoryMoveResult.data?.productModel[0];
      var moveAmount = productDetail.quantity;
      var serialMoveAmount = 0;
      if (inventorySerialMoveResult.code == 2) {
        // insert
        var serialMoveParams = {
          inventoryMove: {
            move_id: inventoryMoveResult.data._id,
            documentNumber: inventoryMoveResult.data.documentNumber,
            dueDate: inventoryMoveResult.data.dueDate,
          },
          inventoryLocation: {
            origin: {
              location_id:
                inventoryMoveResult.data.inventoryLocation.origin.location_id,
              name: inventoryMoveResult.data.inventoryLocation.origin.name,
            },
            destination: {
              location_id:
                inventoryMoveResult.data.inventoryLocation.destination
                  .location_id,
              name: inventoryMoveResult.data.inventoryLocation.destination.name,
            },
          },
          productModel: {
            productModel_id: productDetail._id,
            name: productDetail.name,
            modelCode: productDetail.modelCode,
          },
          inventoryProductSerial: [
            {
              productSerial_id: serialInfo._id,
              serialNumber: serialInfo.serialNumber,
            },
          ],
          createdBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
          updatedBy: {
            user_id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
        };

        if (moveAmount > 0) {
          //insert
          result =
            await InventoryModel.productSerialMove.insertProductSerialMove(
              serialMoveParams
            );
          serialMoveAmount = 1;
          result.doSuccess(1, "Serial number was inserted!");
          // เพิ่มตรงนี้ รอคุณกวินแก้ไข
        } else {
          productOver = true;
        }
      } else if (inventorySerialMoveResult.code == 1) {
        serialMoveAmount = inventorySerialMoveResult.data.inventoryProductSerial
          .length
          ? inventorySerialMoveResult.data.inventoryProductSerial.length
          : 0;

        if (moveAmount > serialMoveAmount) {
          //Update here.
          var params = {};
          params["$push"] = {};

          params["$push"].inventoryProductSerial = [
            {
              productSerial_id: serialInfo._id,
              serialNumber: serialInfo.serialNumber,
            },
          ];

          const conditions = {
            _id: inventorySerialMoveResult.data._id,
          };

          result =
            await InventoryModel.productSerialMove.updateInventoryProductSerailMove(
              conditions,
              params,
              {
                new: true,
                projection: {
                  _id: 1,
                  inventoryProductSerial: 1,
                  productModel: 1,
                },
              }
            );

          if (result.code == 1) {
            serialMoveAmount += 1;
          }
        } else {
          productOver = true;
        }
      }

      if (productOver) {
        result.data = {
          allow: false,
          moveAmount: moveAmount,
          serialMoveAmount: serialMoveAmount,
          left: moveAmount - serialMoveAmount,
        };
        result.doError(10, "This product is already done!");
      } else {
        // all success!

        result.data = {
          allow: true,
          moveAmount: moveAmount,
          serialMoveAmount: serialMoveAmount,
          left: moveAmount - serialMoveAmount,
          updatedData: result.data,
        };
        result.doSuccess(1);
      }
    }
  } catch (error) {
    console.log(error);
    result.doError(0, error);
  }

  return result;
};

exports.updateActiveProducts = async (req, res) => {
  var result = new DataResponse();
  try {
    const validation = new Validator(req.body, {
      _id: "required",
    });

    const matched = await validation.check();

    if (matched) {
      const { _id } = req.body;

      const userData = req.body.authData.userInfo.userData;

      const conditions = {
        lot_id: new ObjectId(_id),
      };

      var params = {
        active: true,
      };

      result =
        await InventoryModel.productSerial.updateInventoryProductSerailByLotId(
          conditions,
          params
        );
    } else {
      result.doError(2, validation.errors);
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};
