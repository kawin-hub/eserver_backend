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

exports.insertSaleReceipt = async (data) => {
  var result = new DataResponse();

  try {
    const { invoice_id, userData, customerInfo } = data;

    const invoiceResultDB = await SaleModel.invoice.getSaleInvoiceByConditions({
      _id: invoice_id,
    });

    if (invoiceResultDB.code == 1 && invoiceResultDB.data.length > 0) {
      const receiptResult = await SaleModel.receipt.getLastestSaleReceiptId();
      const currentDate = new Date();
      var newDocumentNumber = general.getPreTaxId(currentDate) + "-145";

      if (receiptResult.code == 1) {
        var newReceiptId = receiptResult.data.documentNumber.split("-");
        newReceiptId = newReceiptId[newReceiptId.length - 1];

        newReceiptId = parseInt(newReceiptId) + 1;
        newDocumentNumber =
          general.getPreTaxId(currentDate) + "-" + newReceiptId;
      }

      const invoiceResult = invoiceResultDB.data[0];
      var documentNumberTax = "Tax:" + newDocumentNumber;
      const itemDetail =
        invoiceResult.invoiceNumbers +
        ",\ninvoice NO: #" +
        invoiceResult.documentNumber;
      today = general.formatDate(currentDate);

      // ************* Create pdf and save ****************//

      var taxInvoiceDescriptionData = [
        {
          modelCode: "Invoice",
          name: itemDetail,
          price: invoiceResult.amountRecieved.baht,
          quantity: 1,
          discountPercent: 0,
          discountBaht: 0,
        },
      ];

      const taxInvoice = {
        header: {
          fileType: "TAX INVOICE / RECEIPT",
          documentNumber: documentNumberTax,
          createdDate: today,
          dueDate: today,
        },
        shipping: {
          name: customerInfo.name,
          address:
            customerInfo.address +
            "\nTaxpayer identification number :" +
            customerInfo.taxId,
        },
        items: taxInvoiceDescriptionData,
        extraDiscount: 0,
        note: "",
      };

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
    const { _id, getby, txtSearch, lead_id } = req.query;

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
      result = await SaleReceiptModel.getAllSaleInvoices(params);
    } else {
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};
