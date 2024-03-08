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
      customerType: "required|in:project,dealer,general",
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
        customerType,
        convertType,
        quotation_id,
        installationInfo_id,
        deliveryInfo_id,
      } = req.body;

      /* const userData = req.body.authData.userInfo.userData; */

      var quotationResult = await SaleModel.quotation.getSaleQuotationById({
        _id: quotation_id,
      });

      if (quotationResult.code == 1) {
        const products = quotationResult.data.products.map((item) => {
          const { _id, ...rest } = item;
          return rest;
        });

        // Calculate percent and number
        const summary = quotationResult.data.summary; // ดึงค่า summary
        const totalPrice = summary.totalPrice; // ยอดรวมของ quotation
        var bahtToShow = 0;
        var percentToShow = 0;

        function calculate(params) {
          var result = 0;

          if (params.baht[0] > 0) {
            result = [];
            result[0] = (params.baht[0] * 100) / totalPrice;
            result[1] = (params.baht[1] * 100) / totalPrice;
            result[2] = params.baht[0] + params.baht[1];

            if (result[2] > totalPrice) {
              result[2] = "The amount is over the total price!";
            } else {
              result[2] =
                "The payment left : " +
                (totalPrice - (params.baht[0] + params.baht[1]));
            }
          } else {
            result = [];
            result[0] = (params.percent[0] * totalPrice) / 100;
            result[1] = (params.percent[1] * totalPrice) / 100;
            result[2] = result[0] + result[1];

            if (result[2] > totalPrice) {
              result[2] = "The amount is over the total price!";
            }
          }

          console.log(result);

          bahtToShow = result[2];
          percentToShow = ((result[0] + result[1]) / totalPrice) * 100;
        }

        calculate({ baht: [bahtToShow], percent: [percentToShow] });

        percentToShow = isNaN(percentToShow) ? 0 : percentToShow;

        var convertInfoResult = await SaleModel.lead.getSaleLeadById(
          {
            _id: installationInfo_id || deliveryInfo_id,
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
        );

        // ตรวจสอบว่า installationInfo_id หรือ deliveryInfo_id มีการส่งมาหรือไม่
        if (convertType === "install" && installationInfo_id) {
          if (convertInfoResult.code === 1) {
            var result = await SaleModel.invoice.insertSaleInvoice({
              documentNumber: documentNumber,
              issuedDate: issuedDate,
              dueDate: dueDate,
              amountRecieved: {
                percent:
                  typeof percentToShow != "undefined" ? percentToShow : "",
                baht: baht,
              },
              convertInfo: {
                customerType: customerType,
                convertType: convertType,
                installationInfo: {
                  estimateDate: req.body.estimateDate
                    ? req.body.estimateDate
                    : "",
                  address: convertInfoResult.data,
                },
              },
              quotation: quotation_id,
              customerInfo: quotationResult.data.saleLead,
              products: products,
            });
          } else {
            result.doError(5, "installationInfo_id is not found!");
          }
        } else if (convertType === "delivery" && deliveryInfo_id) {
          if (convertInfoResult.code === 1) {
            var result = await SaleModel.invoice.insertSaleInvoice({
              documentNumber: documentNumber,
              issuedDate: issuedDate,
              dueDate: dueDate,
              amountRecieved: {
                percent:
                  typeof percentToShow != "undefined" ? percentToShow : "",
                baht: baht,
              },
              convertInfo: {
                customerType: customerType,
                convertType: convertType,
                deliveryInfo: {
                  deliveryDate: req.body.deliveryDate
                    ? req.body.deliveryDate
                    : "",
                  address: convertInfoResult.data,
                },
              },
              quotation: quotation_id,
              customerInfo: quotationResult.data.saleLead,
              products: products,
            });
          } else {
            result.doError(5, "deliveryInfo_id is not found!");
          }
        } else {
          result.doError(
            5,
            "If convertType is 'install', please provide a valid installationInfo_id. If it's 'delivery', make sure to provide a valid deliveryInfo_id."
          );
        }
      } else {
        result.doError(5, "quotation_id is not found!");
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }
  res.json(result);
};
