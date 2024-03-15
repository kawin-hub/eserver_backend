//Quotation model
let SaleModel = require("../../models/Sale");
let ProductModel = require("../../models/Products");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Insert/Post

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
        estimateDate,
        deliveryDate,
      } = req.body;

      /* const userData = req.body.authData.userInfo.userData; */
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
            leadFirstname: 1,
            leadLastname: 1,
            leadContactNumber: 1,
          }
        ),
      ]);
      if (quotationResult.code == 1 && convertInfoResult.code == 1) {
        //ลบ _id ออกจาก Product ที่ดึงมาจาก QT และให้แสดงส่วนที่เหลือ
        const products = quotationResult.data.products.map((item) => {
          const { _id, ...rest } = item;
          return rest;
        });

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
            customerInfo: quotationResult.data.saleLead,
            products: products,
          };

          if (convertType == "install") {
            insertSaleParam.convertInfo["installationInfo"] = {
              estimateDate:
                typeof estimateDate != "undefined" ? estimateDate : null,
              address: convertInfoResult.data,
            };
          } else if (convertType == "delivery") {
            insertSaleParam.convertInfo["deliveryInfo"] = {
              deliveryDate:
                typeof deliveryDate != "undefined" ? deliveryDate : null,
              address: convertInfoResult.data,
            };
          }

          var result = await SaleModel.invoice.insertSaleInvoice(
            insertSaleParam
          );
        } else {
          result.doError(7, "Payment of this invoice is over quotation total!");
        }

        // ตรวจสอบว่า installationInfo_id หรือ deliveryInfo_id มีการส่งมาหรือไม่
      } else {
        var errorInArray = [];

        if (convertInfoResult.code != 1)
          errorInArray[errorInArray.length] = "lead_id is not found!";

        if (quotationResult.code != 1)
          errorInArray[errorInArray.length] = "deliveryInfo_id is not found!";

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
