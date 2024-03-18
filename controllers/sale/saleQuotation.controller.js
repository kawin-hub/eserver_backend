//Quotation model
let SaleModel = require("../../models/Sale");
let ProductModel = require("../../models/Products");
let { general } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");

// 👉 Get all or by ID

exports.getSaleQuotations = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id } = req.query;

    var SaleQuotationModel = SaleModel.quotation;

    if (typeof _id != "undefined") {
      result = await SaleQuotationModel.getSaleQuotationById({
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

      result = await SaleQuotationModel.getAllSaleQuotations(params);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

// 👉 Post/Insert

exports.insertSaleQuotation = async (req, res) => {
  var result = new DataResponse();

  try {
    var validationParams = {
      documentNumber: "required",
      issuedDate: "required|dateFormat:YYYY-MM-DD",
      dueDate: "required|dateFormat:YYYY-MM-DD",
      lead_id: "required",
      products: "required",
      quotationStatus: "required|in:warm,hot,cold,done",
    };

    /* if (typeof req.body.discountPercent != "undefined") {
      validationParams.discountPercent = "required|numeric";
    }

    if (typeof req.body.discountBaht != "undefined") {
      validationParams.discountBaht = "required|numeric";
    } */

    const validation = new Validator(req.body, validationParams);

    const matched = await validation.check();

    var SaleLeadModel = SaleModel.lead;
    var SaleQuotationModel = SaleModel.quotation;

    if (matched) {
      const {
        documentNumber,
        issuedDate,
        dueDate,
        lead_id,
        customerInfo_id,
        products,
        paymentMethod,
        note,
        quotationStatus,
        extraDiscount,
      } = req.body;

      const userData = req.body.authData.userInfo.userData;

      const LeadResult = await SaleLeadModel.getSaleLeadById(
        { _id: lead_id },
        {
          _id: 1,
          firstname: 1,
          lastname: 1,
          contactNumber: 1,
          companyName: 1,
          branch: 1,
          address: 1,
          taxId: 1,
          lineId: 1,
        }
      );

      if (LeadResult.code == 1) {
        const companyInfo = LeadResult.data.companyInfo.find(
          (info) => info._id.toString() === customerInfo_id
        );

        if (companyInfo) {
          var productModel_ids = [];

          for (var i = 0; i < products.length; i++) {
            productModel_ids[i] = products[i]._id;
          }

          const productResult = await ProductModel.getProductsbyArrayId(
            productModel_ids,
            {
              _id: 1,
              name: 1,
              modelCode: 1,
              price: 1,
            }
          );

          if (
            productResult.code == 1 &&
            products.length == productResult.data.length
          ) {
            var totalDiscount = 0;
            var vat = 7;
            var totalPrice = 0;

            for (var i = 0; i < productResult.data.length; i++) {
              for (var j = 0; j < products.length; j++) {
                if (productResult.data[i]._id == products[j]._id) {
                  productResult.data[i].quantity = products[j].quantity;
                  productResult.data[i].discountPercent =
                    (100 * parseFloat(products[j].discountBaht)) /
                    parseFloat(productResult.data[i].price);
                  productResult.data[i].discountBaht = parseFloat(
                    products[j].discountBaht
                  );
                  totalDiscount +=
                    parseFloat(products[j].discountBaht) *
                    parseFloat(products[j].quantity);
                  totalPrice +=
                    parseFloat(productResult.data[i].price) *
                    parseFloat(products[j].quantity);
                  break;
                }
              }
            }
            const extraDiscountFloat = parseFloat(
              typeof extraDiscount == "undefined" ? 0 : extraDiscount
            );

            totalDiscount += extraDiscountFloat;
            totalPrice = totalPrice - totalDiscount;

            var totalVat = (totalPrice * vat) / 100;
            totalPrice += totalVat;

            var insertQuotationparams = {
              documentNumber: documentNumber,
              issuedDate: issuedDate,
              dueDate: dueDate,
              customerInfo: {
                lead_id: LeadResult.data._id,
                lineId: LeadResult.data.lineId,
                companyInfo: {
                  companyInfo_id: companyInfo._id,
                  firstname: companyInfo.firstname,
                  lastname: companyInfo.lastname,
                  contactNumber: companyInfo.contactNumber,
                  companyName: companyInfo.companyName,
                  branch: companyInfo.branch,
                  address: companyInfo.address,
                },
              },
              customerLevel: LeadResult.data.customerLevel,
              products: productResult.data,
              paymentMethod:
                typeof paymentMethod != "undefined" ? paymentMethod : "",
              note: typeof note != "undefined" ? note : "",
              quotationStatus: quotationStatus,
              createdBy: {
                user_id: userData._id,
                firstname: userData.firstname,
                lastname: userData.lastname,
              },
              summary: {
                extraDiscount: extraDiscountFloat,
                totalDiscount: totalDiscount,
                vat: vat,
                totalPrice: totalPrice,
              },
            };

            result = await SaleQuotationModel.insertSaleQuotation(
              insertQuotationparams
            );
          } else {
            result.doError(5, "product_id is not found!");
          }
        } else {
          result.doError(5, "customerInfo_id is not found!");
        }
      } else {
        result.doError(5, "lead_id is not found!");
      }
    } else {
      result.doError(2, validation.errors);
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};
