// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let ProductModel = require("../../models/Products");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Insert/Post

exports.insertProductSerialRequest = async (req, res) => {
    var result = new DataResponse();
    try {
        const validation = new Validator(req.body, {
            inventoryRequest_id: "required",
            productModel_id: "required",
            inventoryProductSerials: "required",
        });

        const matched = await validation.check();
        if (matched) {
            const {
                inventoryRequest_id,
                productModel_id,
                inventoryProductSerials,
                inOutStatus,
            } = req.body;

            const userData = req.body.authData.userInfo.userData

            var InventoryRequestModel = InventoryModel.request
            var InventoryProductSerialModel = InventoryModel.productSerial

            var inventoryProductSerial_ids = []

            for (var i = 0; i < inventoryProductSerials.length; i++) {
                inventoryProductSerial_ids[i] = inventoryProductSerials[i]._id
            }

            var [inventoryRequestResult, productModelResult, inventoryProductSerialResult] =
                await Promise.all([
                    InventoryRequestModel.getInventoryRequestById(
                        {
                            _id: inventoryRequest_id
                        },
                        {
                            _id: 1,
                            documentNumber: 1,
                            dueDate: 1,
                            requestType: 1,
                            estimatedReturnDate: 1,
                            remark: 1,
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
                    InventoryProductSerialModel.getProducSerialtsbyArrayId(
                        inventoryProductSerial_ids,
                        {
                            _id: 1,
                            serialNumber: 1,
                        }
                    ),
                ]);

            if (inventoryRequestResult.code == 1 && productModelResult.code == 1 && inventoryProductSerialResult.code == 1) {
                var insertProductSerialRequestparams = {
                    inventoryMove: {
                        _id: inventoryRequestResult.data._id,
                        documentNumber: inventoryRequestResult.data.documentNumber,
                        dueDate: inventoryRequestResult.data.dueDate,
                        requestType: inventoryRequestResult.data.requestType,
                        estimatedReturnDate: inventoryRequestResult.data.estimatedReturnDate,
                        remark: inventoryRequestResult.data.remark,
                    },
                    productModel: {
                        _id: productModelResult.data._id,
                        name: productModelResult.data.name,
                        modelCode: productModelResult.data.modelCode,
                    },
                    InventoryProductSerial: inventoryProductSerialResult.data,
                    inOutStatus: typeof inOutStatus != "undefined" ? inOutStatus : "",
                    movements: [
                        {
                            status: "sold",
                            docNumber: inventoryRequestResult.data.documentNumber,
                        },
                    ],
                    createdBy: {
                        _id: userData._id,
                        firstname: userData.firstname,
                        lastname: userData.lastname
                    }
                };

                var productSerialRequestModel = InventoryModel.productSerialRequest;
                result = await productSerialRequestModel.insertProductSerialRequest(
                    insertProductSerialRequestparams
                );
            } else {
                result.doError(5, "Some of ref _id is not found")
            }

        } else {
            result.doError(2, validation.errors);
        }
    } catch (error) {
        console.log(error);
    }

    res.json(result);
};