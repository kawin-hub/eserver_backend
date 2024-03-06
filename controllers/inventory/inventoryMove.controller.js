// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let ProductModel = require("../../models/Products");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Get all or by ID

exports.getInventoryMoves = async (req, res) => {
    var result = new DataResponse();

    try {
        const { _id } = req.query;

        var InventoryMoveModel = InventoryModel.move

        if (typeof _id != "undefined") {
            result = await InventoryMoveModel.getInventoryMoveById({
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

            result = await InventoryMoveModel.getAllInventoryMoves(params);
        }
    } catch (error) {
        console.log(error);
    }

    res.json(result);
};

// 👉 Insert/Post

exports.insertInventoryMove = async (req, res) => {
    var result = new DataResponse();

    try {
        const validation = new Validator(req.body, {
            documentNumber: "required",
            dueDate: "required|dateFormat:YYYY-MM-DD",
            inventoryLocation_origin_id: "required",
            inventoryLocation_destination_id: "required",
            products: "required",
        });

        const matched = await validation.check();

        var InventoryMoveModel = InventoryModel.move

        if (matched) {
            const {
                documentNumber,
                dueDate,
                inventoryLocation_origin_id,
                inventoryLocation_destination_id,
                products,
            } = req.body;

            const userData = req.body.authData.userInfo.userData

            var InventoryLocationModel = InventoryModel.location

            const locationResult = await InventoryLocationModel.getInventoryLocationbyArrayId(
                [inventoryLocation_origin_id, inventoryLocation_destination_id], {
                _id: 1,
                name: 1,
            }
            );

            var productModel_ids = []

            for (var i = 0; i < products.length; i++) {
                productModel_ids[i] = products[i]._id
            }

            if (locationResult.code == 1 && locationResult.data.length >= 2) {
                const productResult = await ProductModel.getProductsbyArrayId(
                    productModel_ids,
                    {
                        _id: 1,
                        name: 1,
                        modelCode: 1,
                    }
                );

                if (productResult.code == 1 && products.length == productResult.data.length) {

                    for (var i = 0; i < productResult.data.length; i++) {
                        for (var j = 0; j < products.length; j++) {
                            if (productResult.data[i]._id == products[j]._id) {
                                productResult.data[i].quantity = products[j].quantity
                                break
                            }
                        }
                    }

                    var insertMoveparams = {
                        inventoryLocation: {
                            origin: {
                                _id:
                                    locationResult.data[0]._id == inventoryLocation_origin_id
                                        ? locationResult.data[0]._id
                                        : locationResult.data[1]._id,
                                name:
                                    locationResult.data[0]._id == inventoryLocation_origin_id
                                        ? locationResult.data[0].name
                                        : locationResult.data[1].name,
                            },
                            destination: {
                                _id:
                                    locationResult.data[0]._id == inventoryLocation_destination_id
                                        ? locationResult.data[0]._id
                                        : locationResult.data[1]._id,
                                name:
                                    locationResult.data[0]._id == inventoryLocation_destination_id
                                        ? locationResult.data[0].name
                                        : locationResult.data[1].name,
                            },
                        },
                        documentNumber: documentNumber,
                        dueDate: dueDate,
                        productModel: productResult.data,
                        createdBy: {
                            _id: userData._id,
                            firstname: userData.firstname,
                            lastname: userData.lastname
                        }
                    };

                    result = await InventoryMoveModel.insertInventoryMove(insertMoveparams);

                } else {
                    result.doError(5, "Some of product is not found")
                }

            } else {
                result.doError(5, "location_id is not found!");
            }

        } else {
            result.doError(2, validation.errors);
        }

    } catch (error) {
        console.log(error);
    }

    res.json(result);
};