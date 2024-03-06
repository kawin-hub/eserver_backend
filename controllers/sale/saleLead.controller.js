//Sale model
let SaleModel = require("../../models/Sale");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Get all or by ID

exports.getSaleLeads = async (req, res) => {
    var result = new DataResponse();

    try {
        const { _id } = req.query;

        var SaleLeadModel = SaleModel.lead

        if (typeof _id != "undefined") {
            result = await SaleLeadModel.getSaleLeadById({
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

            result = await SaleLeadModel.getAllSaleLeads(params);
        }
    } catch (error) {
        console.log(error);
    }

    res.json(result);
};

// 👉 Insert/Post

exports.insertSaleLead = async (req, res) => {

    var result = new DataResponse();

    try {

        const validation = new Validator(req.body, {
            companyName: "required",
            leadFirstname: "required",
            leadContactNumber: "required",
            leadLevel: "required|in:low prudential,middle prudential,high prudential",
        });

        const matched = await validation.check();

        var SaleLeadModel = SaleModel.lead

        if (matched) {

            const { companyName, taxId, branch, address, googleMap, companyEmail, companyContactNumber, leadFirstname, leadLastname, leadContactNumber, lineId, leadLevel, tag } = req.body;

            const userData = req.body.authData.userInfo.userData

            var inserLeadparams = {
                companyName: companyName,
                taxId: typeof taxId != "undefined" ? taxId : "",
                branch: typeof branch != "undefined" ? branch : "",
                address: typeof address != "undefined" ? address : "",
                googleMap: typeof googleMap != "undefined" ? googleMap : "",
                companyEmail: typeof companyEmail != "undefined" ? companyEmail : "",
                companyContactNumber: typeof companyContactNumber != "undefined" ? companyContactNumber : "",
                leadFirstname: leadFirstname,
                leadLastname: typeof leadLastname != "undefined" ? leadLastname : "",
                leadContactNumber: leadContactNumber,
                lineId: typeof lineId != "undefined" ? lineId : "",
                leadLevel: leadLevel,
                tag: typeof tag != "undefined" ? tag : "",
                createdBy: {
                    _id: userData._id,
                    firstname: userData.firstname,
                    lastname: userData.lastname
                }
            };

            result = await SaleLeadModel.insertSaleLead(inserLeadparams);

        } else {
            result.doError(2, validation.errors);
        }

    } catch (error) {
        console.log(error)
    }

    res.json(result);
}