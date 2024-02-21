//User model
let AccountModel = require("../models/Accounts");
let dotenv = require("dotenv");
let { upload, general } = require("../middleware");
const fs = require("fs");
const { DataResponse } = require("../models/general_data.model");
const { Validator } = require("node-input-validator");
const { ObjectId } = require("mongoose").Types;

dotenv.config();


const insertAccountExpense = async (req, res) => {
    var result = new DataResponse();
    var docsName = "documents";
    var imagesName = "images";

    await upload.uploadFiles(req, res, [
        {
            name: imagesName,
            path: "./assets/images/account/expenses",
            allowType: ["jpeg", "jpg", "png"],
        },
        {
            name: docsName,
            path: "./assets/documents/account/expenses",
            maxCount: 5,
            allowType: ["pdf"],
        },
    ]);

    try {
        const validation = new Validator(req.body, {
            lotNumber: "required",
            estimatedDate: "required|dateFormat:YYYY-MM-DD",
            status: "required|in:draft,inactive,active",
            quantity: "required",
            warranty: "required",
            /* expense_id: "required", */
            product_ids: "required",
        });

        const matched = await validation.check();

        if (matched) {
            const {
                product_ids,
                lotNumber,
                estimatedDate,
                status,
                quantity,
                warranty,
            } = req.body;

            const productResult = await ProductModel.getProductsbyArrayId(
                product_ids
            );

            if (productResult.code == 1) {
                for (var i = 0; i < product_ids.length; i++) {
                    for (var j = 0; j < productResult.data.length; j++) {
                        if (product_ids[i] == productResult.data[j]._id) {
                            productResult.data[j].quantity = quantity[i];
                            productResult.data[j].warranty = warranty[i];
                            break;
                        }
                    }
                }

                var params = {
                    lotNumber: lotNumber,
                    estimatedDate: estimatedDate,
                    status: status,
                    products: productResult.data,
                };

                result = await InventoryModel.insertInventoryLot(params);
            }
        } else {
            result.doError(2, validation.errors);
        }

        if (result.code != 1) {
            for (let i = 0; i < req.files[docsName].length; i++) {
                fs.rmSync(req.files[docsName][i].path, {
                    force: true,
                });
            }
        }
    } catch (error) {
        console.log(error);
    }

    res.json(result);
};

module.exports = {
    insertAccountExpense,
};
