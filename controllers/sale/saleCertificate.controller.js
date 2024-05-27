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
    const {
      _id,
      txtSearch,
      dateNonWarrantyStart,
      dateNonWarrantyEnd,
      dateWarrantyStart,
      dateWarrantyEnd,
      typeSelect,
    } = req.query;
    
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
            customerName: searchRegex,
          },
          {
            quotationNumber: searchRegex,
          },
        ];
        params.queryCondition["$or"] = orConditions;
      }

      var currentDate = new Date();

      if (typeSelect == "expired") {
        params.queryCondition["warrantyPreriod.to"] = {
          $lt: currentDate,
        };
      } else if (typeSelect == "available") {
        params.queryCondition["warrantyPreriod.to"] = {
          $gte: currentDate,
        };

        console.log(params);
      } else {
        // Query from date
        if (
          typeof dateWarrantyStart !== "undefined" &&
          typeof dateWarrantyEnd !== "undefined"
        ) {
          const startWarrantyDate = new Date(dateWarrantyStart);
          const endWarrantyDate = new Date(dateWarrantyEnd);

          params.queryCondition["warrantyPreriod.from"] = {
            $gte: startWarrantyDate,
            $lt: endWarrantyDate,
          };
        } else if (
          typeof dateNonWarrantyStart !== "undefined" &&
          typeof dateNonWarrantyEnd !== "undefined"
        ) {
          const startNonWarrantyDate = new Date(dateNonWarrantyStart);
          const endNonWarrantyDate = new Date(dateNonWarrantyEnd);

          params.queryCondition["warrantyPreriod.to"] = {
            $gte: startNonWarrantyDate,
            $lt: endNonWarrantyDate,
          };
        }
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
        quotation_id,
        customerName,
        datePurcharse,
        productService,
        quotationNumber,
        warrantyPreriod,
        detail,
      } = req.body;

      const quotationResultDB = await SaleModel.quotation.getSaleQuotationById({
        _id: quotation_id,
      });
      const userData = req.body.authData.userInfo.userData;

      var insertCertificateParams = {
        customerName: customerName,
        datePurcharse: datePurcharse,
        productService: productService,
        quotationNumber: quotationNumber,
        warrantyPreriod: {
          from: warrantyPreriod.from,
          to: warrantyPreriod.to,
        },
        detail: detail,
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

/// 👉 Delete
exports.deleteCertificate = async (req, res) => {
  const { _id } = req.body;
  try {
    var result = new DataResponse();
    if (typeof _id !== "undefined") {
      result = await SaleModel.certificate.deleteSaleCertificate({
        _id: _id,
      });
    } else {
      result.doError(2, "_id is required.");
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
};

exports.updateCertificate = async (req, res) => {
  var result = new DataResponse();
  try {
    const validationParams = {
      customerName: "required",
      datePurcharse: "required|dateFormat:YYYY-MM-DD",
      productService: "required",
      quotationNumber: "required",
    };

    const validation = new Validator(req.body, validationParams);
    const matched = await validation.check();
    if (matched) {
      const {
        _id,
        customerName,
        datePurcharse,
        productService,
        quotationNumber,
        warrantyPreriod,
        detail,
      } = req.body;
      const updateConditions = {
        _id: _id,
      };

      var params = {
        customerName: customerName,
      };

      if (typeof customerName != "undefined") {
        params["customerName"] = customerName;
      }
      if (typeof datePurcharse != "undefined") {
        params["datePurcharse"] = datePurcharse;
      }
      if (typeof productService != "undefined") {
        params["productService"] = productService;
      }
      if (typeof quotationNumber != "undefined") {
        params["quotationNumber"] = quotationNumber;
      }
      if (typeof warrantyPreriod != "undefined") {
        params["warrantyPreriod"] = warrantyPreriod;
      }
      if (typeof detail != "undefined") {
        params["detail"] = detail;
      }

      const options = { returnOriginal: false };

      result = await SaleModel.certificate.updateSaleCertificate(
        updateConditions,
        params,
        options
      );
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};
