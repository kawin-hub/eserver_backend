//Quotation model
let SaleModel = require("../../models/Sale");
let ProductModel = require("../../models/Products");
let { upload, general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const fs = require("fs");

// 👉 Get all or by ID

exports.getSaleInvoices = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id } = req.query;

    var SaleInvoiceModel = SaleModel.invoice;

    if (typeof _id != "undefined") {
      result = await SaleInvoiceModel.getSaleInvoiceById({
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

      result = await SaleInvoiceModel.getAllSaleInvoices(params);
    }
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
            };

            if (convertType == "install") {
              insertSaleParam.convertInfo["installationInfo"] = {
                estimateDate:
                  typeof estimateDate != "undefined" ? estimateDate : null,
                address: {
                  companyInfo_id: companyInfo._id,
                  companyName: companyInfo.companyName,
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
          } else {
            result.doError(5, "customerInfo_id is not found!");
          }
        } else {
          result.doError(7, "Payment of this invoice is over quotation total!");
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

      if (paymentStatus) params["$set"].paymentStatus = paymentStatus;

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

/* exports.deleteSaleInvoice = async (req, res) => {
  const { _id } = req.body;
  try {
    var result = new DataResponse();
    if (typeof _id != "undefined") {
      result = await SaleModel.invoice.deleteSaleInvoice({
        _id: _id,
        paymentStatus: "unpaid",
      });
    } else {
      result.doError(2, "_id is required.");
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
}; */

const path = require("path");

exports.deleteSaleInvoice = async (req, res) => {
  const { _id } = req.body;
  try {
    var result = new DataResponse();
    if (typeof _id != "undefined") {
      // ดึงข้อมูล invoice จากฐานข้อมูล
      const invoice = await SaleModel.invoice.getSaleInvoiceById({ _id });

      if (invoice.success) {
        // ตรวจสอบสถานะของ invoice
        if (invoice.data.paymentStatus === "paid") {
          // หากสถานะเป็น "paid" ให้ลบ paymentDocuments และ paymentImages ก่อน
          const paymentDocuments = invoice.data.paymentDocuments;
          const paymentImages = invoice.data.paymentImages;

          if (paymentDocuments && paymentDocuments.length > 0) {
            for (const doc of paymentDocuments) {
              fs.rmSync(path.join(__dirname, doc.path), { force: true });
            }
          }

          if (paymentImages && paymentImages.length > 0) {
            for (const img of paymentImages) {
              fs.rmSync(path.join(__dirname, img.path), { force: true });
            }
          }
        }

        // ลบ invoice หลังจากลบ paymentDocuments และ paymentImages เสร็จ
        result = await SaleModel.invoice.deleteSaleInvoice({ _id });
      } else {
        // หากไม่พบ invoice ที่ตรงกับ _id ที่ระบุ
        result.doError(2, "Invoice not found.");
      }
    } else {
      result.doError(2, "_id is required.");
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
};

// ฟังก์ชันสำหรับลบไฟล์
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully.");
    }
  });
};
