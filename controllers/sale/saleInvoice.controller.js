//Quotation model
let SaleModel = require("../../models/Sale");
let {
  insertSaleReceipt,
} = require("../../controllers/sale/saleReceipt.controller");
const { LineClient } = require("../../services/third_party/line");
let { upload, general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const {
  createInvoice,
} = require("../../services/file_management/invoice.service");

// 👉 Get all or by ID

exports.getSaleInvoices = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id, getby, txtSearch, paymentStatus, lead_id, invoiceNumber } =
      req.query;

    var SaleInvoiceModel = SaleModel.invoice;

    if (typeof getby != "undefined" && getby == "quotation") {
      // get by quotation_id
      if (typeof _id != "undefined") {
        var params = {
          quotation_id: new Object(_id),
        };

        if (typeof paymentStatus != "undefined") {
          params.paymentStatus = paymentStatus;
        }
        result = await SaleInvoiceModel.getSaleInvoiceByConditions(params);
      }
    } else if (typeof getby != "undefined" && getby == "invoiceNumbers") {
      if (typeof invoiceNumber != "undefined") {
        var params = {
          documentNumber: invoiceNumber,
        };
        result = await SaleInvoiceModel.getSaleInvoiceByConditions(params);
      }
    } else {
      // get by invoice_id
      if (typeof _id != "undefined") {
        result = await SaleInvoiceModel.getSaleInvoiceByConditions({
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
            "customerInfo.companyInfo.companyName": searchRegex,
          },
          {
            "customerInfo.companyInfo.contactNumber": searchRegex,
          },
        ];

        params.queryCondition["$or"] = orConditions;
      }

      if (typeof paymentStatus !== "undefined") {
        params.queryCondition["paymentStatus"] = paymentStatus;
      }

      if (typeof lead_id !== "undefined") {
        params.queryCondition["customerInfo.lead_id"] = new ObjectId(lead_id);
      }

      result = await SaleInvoiceModel.getAllSaleInvoices(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.getInvoicesByInvoiceNumber = async (req, res) => {
  var result = new DataResponse();

  try {
    const { getby, invoiceNumber } = req.query;

    var SaleInvoiceModel = SaleModel.invoice;

    if (typeof getby != "undefined" && getby == "invoiceNumbers") {
      if (typeof invoiceNumber != "undefined") {
        var params = {
          documentNumber: invoiceNumber,
        };
        result = await SaleInvoiceModel.getSaleInvoiceByInvoiceNumber(params);
      }
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

exports.getNewInvoiceId = async (req, res) => {
  var result = new DataResponse();
  try {
    result = await SaleModel.invoice.getNewSaleInvoiceId();

    var newDocumentNumber = "759-01388";

    if (result.data != null) {
      var documentNumberParseInt = parseInt(
        result.data.documentNumber.replace(/-/g, "")
      );

      newDocumentNumber = documentNumberParseInt + 1;
      newDocumentNumber =
        newDocumentNumber.toString().slice(0, 3) +
        "-" +
        newDocumentNumber.toString().slice(3);
    } else {
      result.data._id = null;
    }
    result.data.documentNumber = newDocumentNumber;
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

// 👉 Post/Insert

exports.insertSaleInvoice = async (req, res) => {
  var result = new DataResponse();

  try {
    var validationParams = {
      documentNumber: "required",
      issuedDate: "required|dateFormat:YYYY-MM-DD",
      dueDate: "required|dateFormat:YYYY-MM-DD",
      baht: "required|numeric",
      convertType: "required|in:install,delivery",
      quotation_id: "required",
      estimateDate: "dateFormat:YYYY-MM-DD", // เพิ่มการตรวจสอบรูปแบบของ estimateDate
      deliveryDate: "dateFormat:YYYY-MM-DD", // เพิ่มการตรวจสอบรูปแบบของ deliveryDate
    };

    const validation = new Validator(req.body, validationParams);

    const matched = await validation.check();

    if (matched) {
      const {
        documentNumber,
        issuedDate,
        dueDate,
        baht,
        convertType,
        quotation_id,
        lead_id,
        customerInfo_id,
        estimateDate,
        deliveryDate,
        note,
        invoiceNumbers,
      } = req.body;

      const userData = req.body.authData.userInfo.userData;
      // ดึงต่า QT

      var [quotationResult, convertInfoResult] = await Promise.all([
        SaleModel.quotation.getSaleQuotationById({
          _id: quotation_id,
        }),
        SaleModel.lead.getSaleLeadById(
          {
            _id: lead_id,
          },
          {
            _id: 1,
            companyName: 1,
            branch: 1,
            address: 1,
            googleMap: 1,
            firstname: 1,
            lastname: 1,
            ContactNumber: 1,
          }
        ),
      ]);

      if (quotationResult.code == 1 && convertInfoResult.code == 1) {
        //ลบ _id ออกจาก Product ที่ดึงมาจาก QT และให้แสดงส่วนที่เหลือ
        const products = quotationResult.data.products.map((item) => {
          const { _id, ...rest } = item;
          return rest;
        });
        const vat = quotationResult.data.summary.vat;
        const companyInfo = convertInfoResult.data.companyInfo.find(
          (info) => info._id.toString() === customerInfo_id
        );

        if (companyInfo) {
          // สร้างฟังก์ชันสำหรับคำนวณเปอร์เซ็นต์และจำนวนเงิน
          async function checkInvoiceTotalPay(params) {
            // ดึงยอดรวมของใบเสนอราคา
            const totalPrice = quotationResult.data.summary.totalPrice;

            // กำหนดตัวแปรเริ่มต้น
            var result = [];
            var bahtToShow = 0;
            var percentToShow = 0;

            // ตรวจสอบว่ามีการกรอก baht มาไหม
            if (params.baht !== undefined && params.baht > 0) {
              // กรณีกรอก baht เท่านั้น
              const bahtValue = parseFloat(params.baht);

              // คำนวณเปอร์เซ็นต์และจำนวนเงินจาก baht
              result[0] = (bahtValue * 100) / totalPrice; // คำนวณ percent
              result[1] = 100 - result[0]; // คำนวณ percent ของจำนวนที่เหลือ
              result[2] = bahtValue; // ยอดเงินที่จ่าย

              result[2] = totalPrice - result[2]; // คำนวณยอดเงินที่เหลือ
            } else if (
              params.percent !== undefined &&
              params.percent.length > 0
            ) {
              // กรณีกรอก percent เท่านั้น
              const percentValue = parseFloat(params.percent[0]);

              result[0] = percentValue; // percent ที่ถูกกรอก
              result[1] = 100 - percentValue; // percent ของจำนวนที่เหลือ
              result[2] = (percentValue * totalPrice) / 100; // ยอดเงินที่จ่าย

              if (result[2] > totalPrice) {
                result[2] = "The amount is over the total price!";
              }
            }
            bahtToShow = result[2];
            percentToShow = result[0];

            const invoiceInfo =
              await SaleModel.invoice.getSaleInvoiceByConditions(
                { quotation_id: quotation_id },
                { _id: 1, quotation_id: 1, amountRecieved: 1 }
              );

            var invoiceCreatedTotal = 0;

            for (var i = 0; i < invoiceInfo.data.length; i++) {
              invoiceCreatedTotal += invoiceInfo.data[i].amountRecieved.baht;
            }
            var totalInvoiceNew = invoiceCreatedTotal + params.baht;

            return {
              status:
                totalInvoiceNew > quotationResult.data.summary.totalPrice
                  ? false
                  : true,
              invoiceTotalOld: invoiceCreatedTotal,
              invoiceTotalNew: totalInvoiceNew,
              invoiceTotalpay: quotationResult.data.summary.totalPrice,
              baht: params.baht,
              percent: isNaN(percentToShow) ? 0 : percentToShow,
            };
          }

          var backwardInPercent = vat / 100 + 1;

          var numberBeforeVat = parseFloat(
            (baht / backwardInPercent).toFixed(2)
          );
          var invoiceDescriptionData = [
            {
              modelCode: "Invoice",
              name: invoiceNumbers,
              price: numberBeforeVat,
              quantity: 1,
              discountPercent: 0,
              discountBaht: 0,
            },
          ];

          // ************* Create pdf and save ****************//
          const invoice = {
            header: {
              fileType: "Invoice",
              documentNumber: documentNumber,
              createdDate: issuedDate,
              dueDate: dueDate,
            },
            shipping: {
              name:
                companyInfo.companyName != ""
                  ? companyInfo.companyName
                  : companyInfo.firstname + " " + companyInfo.lastname,
              address: companyInfo.address,
            },
            items: invoiceDescriptionData,
            extraDiscount: 0,
            note: note,
            vat: vat,
          };

          if (
            typeof companyInfo.taxId !== "undefined" &&
            companyInfo.taxId != ""
          ) {
            invoice.shipping.address +=
              "\nTaxpayer identification number :" + companyInfo.taxId;
          }

          const pdfName = documentNumber + Date.now() + ".pdf";
          const pdfPath = "assets/documents/invoices/" + pdfName;

          createInvoice(invoice, pdfPath);
          ///////////////////////

          // ตัวอย่างการใช้งาน
          const invoiceInfo = await checkInvoiceTotalPay({
            baht: baht,
            percent: [],
          });
          if (invoiceInfo.status) {
            var insertSaleParam = {
              documentNumber: documentNumber,
              issuedDate: issuedDate,
              dueDate: dueDate,
              amountRecieved: {
                baht: baht,
                percent: invoiceInfo.percent,
              },
              convertInfo: {
                customerLevel: quotationResult.data.customerLevel,
                convertType: convertType,
              },
              quotation_id: quotation_id,
              customerInfo: quotationResult.data.customerInfo,
              products: products,
              createdBy: {
                user_id: userData._id,
                firstname: userData.firstname,
                lastname: userData.lastname,
              },
              pdfPath: pdfPath,
              note: note,
              invoiceNumbers: invoiceNumbers,
            };

            if (convertType == "install") {
              insertSaleParam.convertInfo["installationInfo"] = {
                estimateDate:
                  typeof estimateDate != "undefined" ? estimateDate : null,
                address: {
                  companyInfo_id: companyInfo._id,
                  companyName: companyInfo.companyName,
                  branch: companyInfo.branch,
                  taxId: companyInfo.taxId,
                  address: companyInfo.address,
                  googleMap: companyInfo.googleMap,
                  firstname: companyInfo.firstname,
                  lastname: companyInfo.lastname,
                  contactNumber: companyInfo.contactNumber,
                },
              };
            } else if (convertType == "delivery") {
              insertSaleParam.convertInfo["deliveryInfo"] = {
                deliveryDate:
                  typeof deliveryDate != "undefined" ? deliveryDate : null,
                address: {
                  companyInfo_id: companyInfo._id,
                  companyName: companyInfo.companyName,
                  branch: companyInfo.branch,
                  taxId: companyInfo.taxId,
                  address: companyInfo.address,
                  googleMap: companyInfo.googleMap,
                  firstname: companyInfo.firstname,
                  lastname: companyInfo.lastname,
                  contactNumber: companyInfo.contactNumber,
                },
              };
            }

            var result = await SaleModel.invoice.insertSaleInvoice(
              insertSaleParam
            );

            if (result.code != 1) {
              fs.rmSync(pdfPath, {
                force: true,
              });
            }
          } else {
            result.doError(
              7,
              "Payment of this invoice is over quotation total!"
            );
          }
        } else {
          result.doError(5, "customerInfo_id is not found!");
        }

        // ตรวจสอบว่า installationInfo_id หรือ deliveryInfo_id มีการส่งมาหรือไม่
      } else {
        var errorInArray = [];

        if (convertInfoResult.code != 1)
          errorInArray[errorInArray.length] = "lead_id is not found!";

        if (quotationResult.code != 1)
          errorInArray[errorInArray.length] = "quotation_id is not found!";

        result.doError(5, errorInArray);
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }
  res.json(result);
};

// 👉 Put/Update

exports.updateSaleInvoice = async (req, res) => {
  var result = new DataResponse();

  try {
    var paymentImagesName = "paymentImages";
    var paymentDocumentsName = "paymentDocuments";

    await upload.uploadFiles(req, res, [
      {
        name: paymentImagesName,
        path: "./assets/images/account/invoices",
        maxCount: 5,
        allowType: ["jpeg", "jpg", "png"],
      },
      {
        name: paymentDocumentsName,
        path: "./assets/documents/account/invoices",
        maxCount: 5,
        allowType: ["pdf"],
      },
    ]);
    const userData = req.body.authData.userInfo.userData;
    const validation = new Validator(req.body, {
      _id: "required",
      quotation_id: "required",
    });

    const matched = await validation.check();

    if (matched) {
      var {
        _id,
        quotation_id,
        paymentStatus,
        paymentDocumentsRemove,
        paymentImagesRemove,
        invoiceNumbers,
        baht,
        documentNumber,
        companyInfo_id,
        note,
        lead_id,
      } = req.body;
      var quotationInfo = null;

      if (typeof quotation_id !== "undefined") {
        // Check DB ว่ามี QT นี้จริงไหม
        quotationInfo = await SaleModel.quotation.getSaleQuotationById({
          _id: quotation_id,
        });
      }
      //Update

      const conditions = { _id: _id, quotation_id: quotation_id };
      var params = {};

      var paymentDocuments = [];
      var paymentImages = [];
      for (let i = 0; i < req.files[paymentDocumentsName]?.length; i++) {
        paymentDocuments[i] = {
          name: req.files[paymentDocumentsName][i].originalname,
          path: req.files[paymentDocumentsName][i].path,
        };
      }

      for (let i = 0; i < req.files[paymentImagesName]?.length; i++) {
        paymentImages[i] = {
          name: req.files[paymentImagesName][i].originalname,
          path: req.files[paymentImagesName][i].path,
        };
      }

      params["$set"] = {}; // replace
      params["$push"] = {}; // add new

      if (typeof paymentStatus !== "undefined" && paymentStatus == "paid") {
        params["$set"].paymentStatus = paymentStatus;

        var receiptParam = {
          quotation_id: quotation_id,
          invoice_id: _id,
          userData: userData,
          customerInfo: {
            taxId: quotationInfo.data.customerInfo.companyInfo.taxId,
            address: quotationInfo.data.customerInfo.companyInfo.address,
            name: quotationInfo.data.customerInfo.companyInfo.companyName,
            contact: quotationInfo.data.customerInfo.companyInfo.contactNumber,
          },
        };

        await insertSaleReceipt(receiptParam);
      }

      params["$push"] = {
        paymentDocuments: { $each: paymentDocuments },
        paymentImages: { $each: paymentImages },
      };

      result = await SaleModel.invoice.updateInvoice(conditions, params);

      //Delete

      if (typeof paymentDocumentsRemove == "undefined")
        paymentDocumentsRemove = [];
      if (typeof paymentImagesRemove == "undefined") paymentImagesRemove = [];

      if (typeof paymentDocumentsRemove === "string") {
        paymentDocumentsRemove = [paymentDocumentsRemove];
      }

      if (typeof paymentImagesRemove === "string") {
        paymentImagesRemove = [paymentImagesRemove];
      }

      params = {};
      params["$pull"] = {
        paymentDocuments: { _id: { $in: paymentDocumentsRemove } },
        paymentImages: { _id: { $in: paymentImagesRemove } },
      };
      var updateOptions = {
        returnOriginal: true,
      };

      result = await SaleModel.invoice.updateInvoice(
        conditions,
        params,
        updateOptions
      );

      if (result.code == 1 && paymentStatus == "paid") {
        await SaleModel.quotation.updateSaleQuotation(
          { _id: quotation_id },
          { currentStatus: "purchased" }
        );
      }
      if (result.code == 1) {
        const filteredPaymentDocumentsToDelete =
          result.data.paymentDocuments.filter((item) =>
            paymentDocumentsRemove.includes(item._id.toString())
          );

        for (let i = 0; i < filteredPaymentDocumentsToDelete?.length; i++) {
          fs.rmSync(filteredPaymentDocumentsToDelete[i].path, {
            force: true,
          });
        }

        const filteredPaymentImagesToDelete = result.data.paymentImages.filter(
          (item) => paymentImagesRemove.includes(item._id.toString())
        );

        for (let i = 0; i < filteredPaymentImagesToDelete?.length; i++) {
          fs.rmSync(filteredPaymentImagesToDelete[i].path, {
            force: true,
          });
        }
      }
    }

    if (result.code != 1) {
      for (let i = 0; i < req.files[paymentImagesName]?.length; i++) {
        fs.rmSync(req.files[paymentImagesName][i].path, {
          force: true,
        });
      }
      for (let i = 0; i < req.files[paymentDocumentsName]?.length; i++) {
        fs.rmSync(req.files[paymentDocumentsName][i].path, {
          force: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

// 👉 Delete

exports.deleteInvoice = async (req, res) => {
  const { _id } = req.body;
  try {
    var result = new DataResponse();

    if (typeof _id !== "undefined") {
      // เรียกใช้เมธอดเพื่อดึงข้อมูล invoice จาก _id

      var resultInvioiceDeleted =
        await SaleModel.invoice.getSaleInvoiceByConditions({
          _id: new ObjectId(_id),
        });

      result = await SaleModel.invoice.deleteSaleInvoice({
        _id: _id,
        paymentStatus: "unpaid",
      });
      if (result.code == 1 && resultInvioiceDeleted.data.length > 0) {
        if (resultInvioiceDeleted.data[0]?.pdfPath) {
          upload.deleteFiles([resultInvioiceDeleted.data[0].pdfPath]);
        }
      } else if (result.code == 3) {
        result.doError(3, "To delete invoice the status must be 'unpaid'");
      }
    } else {
      // หาก _id เป็น undefined แจ้งข้อความผิดพลาด
      result.doError(2, "_id is required.");
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
};

exports.sendInvoiceToLine = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id, method } = req.body;

    result = await createInvoiceParamToLine(_id, method);

    if (result.code == 1) {
      await LineClient.pushMessage(result.data.line_id, result.data.message);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

const createInvoiceParamToLine = async (_id, method) => {
  var result = new DataResponse();

  if (method == "receipt") {
    var SaleReceiptModel = SaleModel.receipt;
    result = await SaleReceiptModel.getSaleReceiptByConditions({
      _id: _id,
    });
  } else if (method == "invoice") {
    var SaleInvoiceModel = SaleModel.invoice;
    result = await SaleInvoiceModel.getSaleInvoiceByConditions({
      _id: _id,
    });
  }
  var SaleQuotationModel = SaleModel.quotation;

  if (result.code == 1 && result.data.length > 0) {
    const dataInfo = result.data[0];

    quotationResult = await SaleQuotationModel.getSaleQuotationById({
      _id: dataInfo.quotation_id,
    });

    if (quotationResult.code == 1 && quotationResult.data) {
      var pdfURI = process.env.URI + "/api/" + dataInfo.pdfPath;
      const line_id = dataInfo.customerInfo.lineId;
      var contents = {};
      var documentNumber = dataInfo.documentNumber;
      const quotation_id = quotationResult.data.documentNumber;
      var documentName = documentNumber;

      const vatInPerCent = quotationResult.data.summary.vat;
      var backwardInPercent = vatInPerCent / 100 + 1;

      const totalPrice = dataInfo.amountRecieved.baht;
      const subtotal = totalPrice / backwardInPercent;
      const vat = totalPrice - subtotal;
      var displayText = "";

      var txtDisplay = "INVOICE";
      var refIDTxtDisplay = "REF QUOTATION ID : ";
      var refIDDisplay = quotation_id;

      if (method == "receipt") {
        const SaleReceiptModel = SaleModel.receipt;
        const receiptResult = await SaleReceiptModel.getSaleReceiptByConditions(
          {
            quotation_id: dataInfo.quotation_id,
          },
          {
            _id: -1,
            pdfPath: -1,
          }
        );

        pdfURI = process.env.URI + "/api/" + receiptResult.data[0].pdfPath;
        txtDisplay = "RECEIPT";
        refIDTxtDisplay = "REF INVOICE ID : ";
        refIDDisplay = dataInfo.invoice.documentNumber;
        documentNumber = "TAX" + documentNumber;
        documentName = "TAX" + documentName;
        displayText = dataInfo?.detail;
      } else if (method == "invoice") {
        displayText = dataInfo?.invoiceNumbers;
      }

      contents = {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: txtDisplay,
              weight: "bold",
              color: "#FFBE98",
              size: "sm",
            },
            {
              type: "text",
              text: "#" + documentName,
              weight: "bold",
              size: "xl",
              margin: "md",
            },
            {
              type: "text",
              text: displayText,
              size: "xs",
              color: "#aaaaaa",
              margin: "sm",
              wrap: true,
            },
            {
              type: "separator",
              margin: "xxl",
            },
            {
              type: "box",
              layout: "vertical",
              margin: "none",
              spacing: "sm",
              contents: [
                {
                  type: "box",
                  layout: "horizontal",
                  margin: "xxl",
                  contents: [
                    {
                      type: "text",
                      text: "SUBTOTAL",
                      size: "sm",
                      color: "#555555",
                    },
                    {
                      type: "text",
                      text:
                        "฿" +
                        subtotal.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }),
                      size: "sm",
                      color: "#111111",
                      align: "end",
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "text",
                      text: "VAT ( " + vatInPerCent + "% )",
                      size: "sm",
                      color: "#555555",
                    },
                    {
                      type: "text",
                      text:
                        "฿" +
                        vat.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }),
                      size: "sm",
                      color: "#111111",
                      align: "end",
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "horizontal",
                  contents: [
                    {
                      type: "text",
                      text: "TOTAL",
                      size: "sm",
                      color: "#555555",
                    },
                    {
                      type: "text",
                      text:
                        "฿" +
                        totalPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }),
                      align: "end",
                      color: "#111111",
                      size: "sm",
                    },
                  ],
                },
              ],
            },
            {
              type: "separator",
              margin: "xxl",
            },
            {
              type: "box",
              layout: "horizontal",
              margin: "xxl",
              contents: [
                {
                  type: "text",
                  text: refIDTxtDisplay,
                  size: "xs",
                  color: "#aaaaaa",
                  flex: 0,
                },
                {
                  type: "text",
                  text: "#" + refIDDisplay,
                  color: "#aaaaaa",
                  size: "xs",
                  align: "end",
                },
              ],
            },
            {
              type: "separator",
              margin: "xxl",
            },
            {
              type: "box",
              margin: "xxl",
              layout: "vertical",
              contents: [
                {
                  type: "button",
                  action: {
                    type: "uri",
                    label: "DOWNLOAD " + txtDisplay,
                    uri: pdfURI,
                  },
                  style: "primary",
                  color: "#FFBE98",
                },
              ],
            },
          ],
        },
        styles: {
          footer: {
            separator: true,
          },
        },
      };

      const message = {
        type: "flex",
        altText: "Invoice", // Alternative text for accessibility
        contents: {
          type: "carousel",
          contents: [contents],
        }, // Your Flex Message JSON object
      };

      result.doSuccess();

      result.data = {
        line_id: line_id,
        message: message,
      };
    }
  } else {
    result.doError(5, "This invoice_id is not exist!");
  }

  return result;
};

exports.getInvoiceCount = async (req, res) => {
  var result = new DataResponse();

  try {
    var dbResponse = await SaleModel.invoice.getCountInvoice();
    if (dbResponse.code == 1) {
      result.doSuccess(1);
    }
    result.data = {
      all: 0,
      paid: 0,
      unpaid: 0,
    };
    if (dbResponse.data.length > 0) {
      result.data = {
        all: dbResponse.data.length,
        paid: dbResponse.data.filter((value) => value.paymentStatus === "paid")
          .length,
        unpaid: dbResponse.data.filter(
          (value) => value.paymentStatus === "unpaid"
        ).length,
      };
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
};

//********** For Dashboard ************/

exports.getSaleInvoiceTotalByConditions = async (params) => {
  try {
    var result = await SaleModel.invoice.getInvoicesTotalByConditions(params);

    var myData = 0;
    if (result.code == 1 && result.data.length > 0) {
      myData = result.data[0].total;
    }
    return {
      revenues: myData,
    };
  } catch (error) {
    console.log(error);
  }
};
