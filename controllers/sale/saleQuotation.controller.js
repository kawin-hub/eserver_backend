//Quotation model
let SaleModel = require("../../models/Sale");
let ProductModel = require("../../models/Products");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Get all or by ID

exports.getSaleQuotations = async (req, res) => {
    var result = new DataResponse();

    try {
        const { _id } = req.query;

        var SaleQuotationModel = SaleModel.quotation

        if (typeof _id != "undefined") {
            result = await SaleQuotationModel.getSaleQuotationById({
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

            result = await SaleQuotationModel.getAllSaleQuotations(params);
        }
    } catch (error) {
        console.log(error);
    }

    res.json(result);
};

// 👉 Insert/Post

exports.insertSaleQuotation = async (req, res) => {
    var result = new DataResponse();

    try {

        const validation = new Validator(req.body, {
            documentNumber: "required",
            issuedDate: "required|dateFormat:YYYY-MM-DD",
            dueDate: "required|dateFormat:YYYY-MM-DD",
            salesperson: "required",
            saleLead_id: "required",
            products: "required",
            quotationStatus: "required|in:warm,hot,cold,done"
        })

        const matched = await validation.check();

        var SaleLeadModel = SaleModel.lead
        var SaleQuotationModel = SaleModel.quotation

        if (matched) {
            const { documentNumber, issuedDate, dueDate, saleLead_id, products, salesperson, paymentMethod, note, quotationStatus } = req.body;

            const userData = req.body.authData.userInfo.userData

            const LeadResult = await SaleLeadModel.getSaleLeadById({ _id: saleLead_id },
                {
                    _id: 1,
                    leadFirstname: 1,
                    leadLastname: 1,
                    leadContactNumber: 1,
                    companyName: 1,
                    branch: 1,
                    address: 1,
                    taxId: 1,
                    lineId: 1,
                });

            if (LeadResult.code == 1) {

                var productModel_ids = []

                for (var i = 0; i < products.length; i++) {
                    productModel_ids[i] = products[i]._id
                }

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
                                productResult.data[i].price = products[j].price
                                productResult.data[i].quantity = products[j].quantity
                                break
                            }
                        }
                    }

                    var insertQuotationparams = {
                        documentNumber: documentNumber,
                        issuedDate: issuedDate,
                        dueDate: dueDate,
                        saleLead: LeadResult.data,
                        products: productResult.data,
                        salesperson: salesperson,
                        paymentMethod: typeof paymentMethod != "undefined" ? paymentMethod : "",
                        note: typeof note != "undefined" ? note : "",
                        quotationStatus: quotationStatus,
                        createdBy: {
                            _id: userData._id,
                            firstname: userData.firstname,
                            lastname: userData.lastname
                        }

                    };

                    result = await SaleQuotationModel.insertSaleQuotation(insertQuotationparams);

                } else {
                    result.doError(5, "product_id is not found!");
                }

            } else {
                result.doError(5, "lead_id is not found!");
            }

        } else {
            result.doError(2, validation.errors);
        }

    } catch (error) {
        console.log(error)
    }

    res.json(result);
}