//account model
let SaleModel = require("../models/Sale");
let dotenv = require("dotenv");
let { upload, general } = require("../middleware");
const fs = require("fs");
const { DataResponse } = require("../models/general_data.model");
const { Validator } = require("node-input-validator");
const path = require("path");
const { match } = require("assert");
const { ObjectId } = require("mongoose").Types;

dotenv.config();

//Sale Lead

const getSaleLeads = async (req, res) => {
    var result = new DataResponse();

    try {
        const { _id } = req.query;

        if (typeof _id != "undefined") {
            result = await SaleModel.getSaleLeadById({
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

            result = await SaleModel.getAllSaleLeads(params);
        }
    } catch (error) {
        console.log(error);
    }

    res.json(result);
};

const insertSaleLead = async (req, res) => {

    var result = new DataResponse();

    try {

        const validation = new Validator(req.body, {
            companyName: "required",
            leadFirstname: "required",
            leadContactNumber: "required",
            leadLevel: "required|in:low prudential,middle prudential,high prudential",
        });

        const matched = await validation.check();

        if (matched) {

            const { companyName, taxId, branch, address, googleMap, companyEmail, companyContactNumber, leadFirstname, leadLastname, leadContactNumber, lineId, leadLevel, tag } = req.body;

            var params = {
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
            };

            result = await SaleModel.insertSaleLead(params);

        } else {
            result.doError(2, validation.errors);
        }

    } catch (error) {
        console.log(error)
    }

    res.json(result);
}

//Sale Quotation

const insertSaleQuotation = async (req, res) => {
    var result = new DataResponse();

    res.json(result);
}

module.exports = {
    getSaleLeads,
    insertSaleLead,
    insertSaleQuotation,
};