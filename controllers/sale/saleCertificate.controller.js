let SaleModel = require("../../models/Sale");
let { general, upload } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const { LineClient } = require("../../services/third_party/line");
const dotenv = require("dotenv");
dotenv.config();

const {
  createInvoice,
} = require("../../services/file_management/invoice.service");

exports.getSaleCertificate = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id, txtSearch } = req.query;

    if (typeof _id != "undefined") {
      result = await SaleModel.certificate.getCertificateById({
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
            documentNumber: searchRegex,
          },
          {
            whom: searchRegex,
          },
        ];
        params.queryCondition["$or"] = orConditions;
      }

      result = await SaleModel.certificate.getAllCertificate(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.insertSaleCertificate = async (req, res) => {
  var result = new DataResponse();

  try {
    var validationParams = {
      customerName: "required",
      datePurcharse: "required|dateFormat:YYYY-MM-DD",
      productService: "required",
      quotationNumber: "required",
    };

    const validation = new Validator(req.body, validationParams);

    const matched = await validation.check();

    if (matched) {
      const {
        lead_id,
        quotation_id,
        customerName,
        datePurcharse,
        productService,
        quotationNumber,
        warrantyPreriod,
      } = req.body;

      const userData = req.body.authData.userInfo.userData;

      var insertCertificateParams = {
        customerName: customerName,
        lead_id: lead_id,
        quotation_id: quotation_id,
        datePurcharse: datePurcharse,
        productService: productService,
        quotationNumber: quotationNumber,
        warrantyPreriod: {
          from: warrantyPreriod.from,
          to: warrantyPreriod.to,
        },
        createdBy: {
          user_id: userData._id,
          firstname: userData.firstname,
          lastname: userData.lastname,
        },
      };

      result = await SaleModel.certificate.insertSaleCertificate(
        insertCertificateParams
      );
    } else {
      result.doError(2, validation.errors);
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
};
