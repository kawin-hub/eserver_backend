let SaleModel = require("../../models/Sale");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { LineClient } = require("../../services/third_party/line");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const {
  createInvoice,
} = require("../../services/file_management/invoice.service");
const { updateInvoice } = require("../../models/Sale/invoice/invoice.model");

exports.insertSaleReceipt = async (data) => {
  var result = new DataResponse();
  try {
    const { invoice_id, userData, customerInfo, quotation_id, paidDate } = data;

    const invoiceResultDB = await SaleModel.invoice.getSaleInvoiceByConditions({
      _id: invoice_id,
    });
    const quotationResultDB = await SaleModel.quotation.getSaleQuotationById({
      _id: quotation_id,
    });
    const vat = quotationResultDB.data.summary.vat;
    if (invoiceResultDB.code == 1 && invoiceResultDB.data.length > 0) {
      const receiptResult = await SaleModel.receipt.getLastestSaleReceiptId();
      const currentDate = new Date();
      var newDocumentNumber = general.getPreTaxId(currentDate) + "-153";

      if (receiptResult.code == 1) {
        var newReceiptId = receiptResult.data.documentNumber.split("-");
        newReceiptId = newReceiptId[newReceiptId.length - 1];

        newReceiptId = parseInt(newReceiptId) + 1;
        newDocumentNumber =
          general.getPreTaxId(currentDate) + "-" + newReceiptId;
      }

      const invoiceResult = invoiceResultDB.data[0];
      var documentNumberTax = "TAX" + newDocumentNumber;
      const itemDetail =
        invoiceResult.invoiceNumbers +
        ",\ninvoice No: #" +
        invoiceResult.documentNumber;
      today = general.formatDate(currentDate);

      // ************* Create pdf and save ****************//

      var backwardInPercent = vat / 100 + 1;

      var numberBeforeVat = parseFloat(
        (invoiceResult.amountRecieved.baht / backwardInPercent).toFixed(2)
      );
      var taxInvoiceDescriptionData = [
        {
          modelCode: "Invoice",
          name: itemDetail,
          price: numberBeforeVat,
          quantity: 1,
          discountPercent: 0,
          discountBaht: 0,
        },
      ];

      const taxInvoice = {
        header: {
          fileType: "TAX INVOICE / RECEIPT",
          documentNumber: documentNumberTax,
          createdDate: paidDate,
          dueDate: today,
        },
        shipping: {
          name: customerInfo.name,
          address: customerInfo.address,
        },
        items: taxInvoiceDescriptionData,
        extraDiscount: 0,
        note: "",
        vat: vat,
      };

      if (
        typeof customerInfo.taxId !== "undefined" ||
        customerInfo.taxId != ""
      ) {
        taxInvoice.shipping.address +=
          "\nTaxpayer identification number :" + customerInfo.taxId;
      }

      const pdfTaxInvoice = newDocumentNumber + "-" + Date.now() + ".pdf";
      const pdfTaxInvoicePath = "assets/documents/taxInvoice/" + pdfTaxInvoice;

      createInvoice(taxInvoice, pdfTaxInvoicePath, "receipt");

      var params = {
        documentNumber: newDocumentNumber,
        quotation_id: invoiceResult.quotation_id,
        invoice: {
          invoice_id: invoiceResult._id,
          documentNumber: invoiceResult.documentNumber,
        },
        customerLevel: invoiceResult.convertInfo.customerLevel,
        customerInfo: {
          lead_id: invoiceResult.customerInfo.lead_id,
          lineId: invoiceResult.customerInfo.lineId,
          taxId: customerInfo.taxId,
          address: customerInfo.address,
          name: customerInfo.name,
          contactNumber: customerInfo.contact,
        },
        detail: itemDetail,
        amountRecieved: invoiceResult.amountRecieved,
        pdfPath: pdfTaxInvoicePath,
        createdBy: {
          user_id: userData._id,
          firstname: userData.firstname,
          lastname: userData.lastname,
        },
        vat: vat,
        paidDate: paidDate,
      };

      result = await SaleModel.receipt.insertSaleReCeipt(params);

      if (result.code != 1) {
        fs.rmSync(pdfTaxInvoicePath, {
          force: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

exports.getSaleReceipts = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id, getby, txtSearch, lead_id, dateCreatedStart, dateCreatedEnd } =
      req.query;

    var SaleReceiptModel = SaleModel.receipt;

    if (typeof getby != "undefined" && getby == "quotation") {
      // get by quotation_id
      if (typeof _id != "undefined") {
        var params = {
          quotation_id: new Object(_id),
        };

        result = await SaleReceiptModel.getSaleReceiptByConditions(params);
      }
    } else if (typeof getby != "undefined" && getby == "invoice") {
      // get by quotation_id
      if (typeof _id != "undefined") {
        var params = {
          invoice_id: new Object(_id),
        };

        result = await SaleReceiptModel.getSaleReceiptByConditions(params);
      }
    } else {
      // get by invoice_id
      if (typeof _id != "undefined") {
        result = await SaleReceiptModel.getSaleReceiptByConditions({
          _id: new Object(_id),
        });
      }
    }

    if (typeof _id === "undefined") {
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
            "customerInfo.name": searchRegex,
          },
          {
            "customerInfo.contactNumber": searchRegex,
          },
        ];

        params.queryCondition["$or"] = orConditions;
      }

      if (typeof lead_id !== "undefined") {
        params.queryCondition["customerInfo.lead_id"] = new ObjectId(lead_id);
      }

      if (
        typeof dateCreatedStart !== "undefined" &&
        typeof dateCreatedEnd !== "undefined"
      ) {
        const startDate = new Date(dateCreatedStart);
        const endDate = new Date(dateCreatedEnd);

        params.queryCondition["createdAt"] = {
          $gte: startDate,
          $lt: endDate,
        };
      }

      result = await SaleReceiptModel.getAllSaleInvoices(params);
    } else {
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.updateReceipt = async (req, res) => {
  var result = new DataResponse();
  try {
    const validationParams = {
      quotation_id: "required",
    };

    const validation = new Validator(req.body, validationParams);
    const matched = await validation.check();
    if (matched) {
      const {
        _id,
        customerInfo,
        quotation_id,
        paidDate,
        invoice,
        documentNumber,
      } = req.body;
      const receiptResultDB =
        await SaleModel.receipt.getSaleReceiptByConditions({
          _id: _id,
        });

      const quotationResultDB = await SaleModel.quotation.getSaleQuotationById({
        _id: quotation_id,
      });
      const vat = quotationResultDB.data.summary.vat;

      var invoice_id = invoice.invoice_id;
      const updateConditionsInvoice = { _id: invoice_id };
      var paramsInvoice = {};
      if (typeof paidDate != "undefined") {
        paramsInvoice["paidDate"] = paidDate;
      }

      updateInvoice(updateConditionsInvoice, paramsInvoice);

      if (receiptResultDB.code == 1) {
        const receiptResult = receiptResultDB.data[0];
        const pdfDefaultName = documentNumber + Date.now() + ".pdf";
        var pdfPath = "assets/documents/invoices/" + pdfDefaultName;
        if (typeof receiptResult.pdfPath !== "undefined") {
          pdfPath = receiptResult.pdfPath;
        }

        var backwardInPercent = vat / 100 + 1;

        var numberBeforeVat = parseFloat(
          (receiptResult.amountRecieved.baht / backwardInPercent).toFixed(2)
        );

        var receiptDescription = [
          {
            modelCode: "Invoice",
            name: receiptResult.detail,
            price: numberBeforeVat,
            quantity: 1,
            discountPercent: 0,
            discountBaht: 0,
          },
        ];

        // ************* Create pdf and save ****************//
        const taxInvoice = {
          header: {
            fileType: "TAX INVOICE / RECEIPT",
            documentNumber: "TAX" + documentNumber,
            createdDate: paidDate,
            dueDate: receiptResult.createdAt.toISOString().split("T")[0],
          },
          shipping: {
            name: customerInfo.name,
            address: customerInfo.address,
          },
          items: receiptDescription,
          extraDiscount: 0,
          note: "",
          vat: vat,
        };

        if (
          typeof customerInfo.taxId !== "undefined" ||
          customerInfo.taxId != ""
        ) {
          taxInvoice.shipping.address +=
            "\nTaxpayer identification number :" + customerInfo.taxId;
        }

        createInvoice(taxInvoice, pdfPath, "receipt");

        const updateConditions = {
          _id: _id,
        };

        var params = {
          "customerInfo.name": customerInfo.name,
        };

        if (typeof customerInfo.taxId != "undefined") {
          params["customerInfo.taxId"] = customerInfo.taxId;
        }
        if (typeof customerInfo.name != "undefined") {
          params["customerInfo.name"] = customerInfo.name;
        }
        if (typeof customerInfo.address != "undefined") {
          params["customerInfo.address"] = customerInfo.address;
        }
        if (typeof customerInfo.contactNumber != "undefined") {
          params["customerInfo.contactNumber"] = customerInfo.contactNumber;
        }
        if (typeof paidDate != "undefined") {
          params["paidDate"] = paidDate;
        }
        if (typeof documentNumber != "undefined") {
          params["documentNumber"] = documentNumber;
        }

        const options = { returnOriginal: false };

        result = await SaleModel.receipt.updateSaleReceipt(
          updateConditions,
          params,
          options
        );
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.deleteReceipt = async (req, res) => {
  const { _id } = req.body;
  try {
    var result = new DataResponse();
    if (typeof _id !== "undefined") {
      result = await SaleModel.receipt.deleteSaleReceipt({
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
