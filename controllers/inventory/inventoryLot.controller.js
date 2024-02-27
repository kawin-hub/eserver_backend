// 👉 Inventory model
let InventoryModel = require("../../models/Inventory");
let AccountModel = require("../../models/Account");
let ProductModel = require("../../models/Products");
let { upload, general } = require("../../middleware");
const fs = require("fs");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Get all or by ID

exports.getInventoryLots = async (req, res) => {
    var result = new DataResponse();

    try {
        const { _id } = req.query;

        var InventoryLotModel = InventoryModel.lot

        if (typeof _id != "undefined") {
            result = await InventoryLotModel.getInventoryLotById({
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

            result = await InventoryLotModel.getALLInventoryLots(params);
        }
    } catch (error) {
        console.log(error);
    }

    res.json(result);
};

// 👉 Insert/Post

exports.insertInventoryLot = async (req, res) => {
    var result = new DataResponse();

    try {
        var docsName = "documents";

        var resUpload = await upload.uploadFiles(req, res, [
            {
                name: docsName,
                path: "./assets/documents/inventory/lots",
                maxCount: 5,
                allowType: ["pdf"],
            },
        ]);

        if (resUpload.success) {
            const validation = new Validator(req.body, {
                lotNumber: "required",
                estimatedDate: "required|dateFormat:YYYY-MM-DD",
                status: "required|in:draft,inactive,active",
                quantity: "required",
                warranty: "required",
                accountExpense_id: "required",
                productModel_id: "required",
            });
            const matched = await validation.check();

            if (matched) {
                const {
                    lotNumber,
                    estimatedDate,
                    status,
                    quantity,
                    warranty,
                    accountExpense_id,
                    productModel_id,
                } = req.body;

                var productModel_ids = []

                if (typeof productModel_id == "string") {
                    productModel_ids[0] = productModel_id
                } else {
                    productModel_ids = productModel_id
                }
                
                var AccountExpenseModel = AccountModel.expense

                const expenseResult = await AccountExpenseModel.getAccountExpenseById({
                    _id: accountExpense_id,
                },
                    {
                        _id: 1,
                        documentNumber: 1,
                    });

                //// ❌ รอแก้ ProductModel
                if (expenseResult.code == 1) {
                    const productResult = await ProductModel.getProductsbyArrayId(
                        productModel_ids,
                        {
                            _id: 1,
                            name: 1,
                            modelCode: 1,
                        }
                    );

                    var quantities = []

                    if (typeof quantity == "string") {
                        quantities[0] = quantity
                    } else {
                        quantities = quantity
                    }

                    var warranties = []

                    if (typeof warranty == "string") {
                        warranties[0] = warranty
                    } else {
                        warranties = warranty
                    }

                    if (productResult.code == 1) {
                        for (var i = 0; i < productModel_ids.length; i++) {
                            for (var j = 0; j < productResult.data.length; j++) {
                                if (productModel_ids[i] == productResult.data[j]._id) {
                                    productResult.data[j].quantity = quantities[i];
                                    productResult.data[j].warranty = warranties[i];
                                    break;
                                }
                            }
                        }

                        var documents = [];

                        for (let i = 0; i < req.files[docsName]?.length; i++) {
                            documents[i] = {
                                name: req.files[docsName][i].originalname,
                                path: req.files[docsName][i].path,
                            };
                        }

                        var insertLotparams = {
                            lotNumber: lotNumber,
                            estimatedDate: estimatedDate,
                            status: status,
                            quantity: quantities,
                            warranty: warranties,
                            accountExpense: expenseResult.data,
                            productModel: productResult.data,
                            documents: documents,
                            currentStatus: "in progress",
                        };

                        var InventoryLotModel = InventoryModel.lot
                        result = await InventoryLotModel.insertInventoryLot(insertLotparams);

                    } else {
                        result.doError(5, "product_ids is not found!");
                    }
                } else {
                    result.doError(5, "expense_id is not found!");
                }
            } else {
                result.doError(2, validation.errors);
            }
        } else {
            result.doError(7, "Files is wrong format, please check!");
        }
    } catch (error) {
        console.log(error);
    }

    if (result.code != 1) {
        for (let i = 0; i < req.files[docsName].length; i++) {
            fs.rmSync(req.files[docsName][i].path, {
                force: true,
            });
        }
    }

    res.json(result);
};

// 👉 Delete

exports.deleteInventoryLot = async (req, res, next) => {
    let { _id } = req.body;

    let result = null;
    let message = "Insert failed";
    let statusCode = 400;

    var InventoryLotModel = InventoryModel.lot

    if (_id !== undefined) {
        result = await InventoryLotModel.deleteInventoryLot({ _id: _id });

        if (result != null) {
            statusCode = 200;
            message = "Delete inventory lot successfully";
        } else {
            message = "Ops!!! something has gone wrong.";
        }
    } else {
        message = "_id is required!";
    }

    res.status(statusCode).send({ message, result });
};