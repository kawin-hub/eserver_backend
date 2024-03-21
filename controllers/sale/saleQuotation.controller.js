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
        companyInfo_id,
        firstname,
        lastname,
        address,
        contactNumber,
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
          companyName: 1,
          branch: 1,
          taxId: 1,
          lineId: 1,
        }
      );

      if (LeadResult.code == 1) {
        const companyInfo = LeadResult.data.companyInfo.find(
          (info) => info._id.toString() === companyInfo_id
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
                  firstname:
                    typeof firstname != "undefined"
                      ? firstname
                      : companyInfo.firstname,
                  lastname:
                    typeof lastname != "undefined"
                      ? lastname
                      : companyInfo.lastname,
                  contactNumber:
                    typeof contactNumber != "undefined"
                      ? contactNumber
                      : companyInfo.contactNumber,
                  companyName: companyInfo.companyName,
                  branch: companyInfo.branch,
                  address:
                    typeof address != "undefined"
                      ? address
                      : companyInfo.address,
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

// 👉 Put/Update

exports.updateSaleQuotation = async (req, res) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      _id: "required",
      lead_id: "required",
      companyInfo_id: "required",
      issuedDate: "dateFormat:YYYY-MM-DD",
      dueDate: "dateFormat:YYYY-MM-DD",
      quotationStatus: "in:warm,hot,cold,done",
    });
    const matched = await validation.check();

    if (matched) {
      const {
        _id,
        lead_id,
        companyInfo_id,
        documentNumber,
        issuedDate,
        dueDate,
        firstname,
        lastname,
        address,
        contactNumber,
        paymentMethod,
        products,
        note,
        quotationStatus,
        extraDiscount,
      } = req.body;

      var LeadResult = null;
      //check DB
      if (typeof lead_id !== "undefined")
        LeadResult = await SaleModel.lead.getSaleLeadById({
          _id: lead_id,
        });

      const companyInfo = LeadResult.data.companyInfo.find(
        (info) => info._id.toString() === customerInfo_id
      );

      if (typeof products !== "undefined")
        productResult = await ProductModel.getProductsbyArrayId(
          productModel_ids
        );

      //update
      const updateConditions = {
        _id: _id,
        lead_id: lead_id,
        "companyInfo.companyInfo_id": companyInfo_id,
      };
      var params = {};
      // ตรวจสอบว่ามีข้อมูลที่จะใช้ในการอัปเดตหรือไม่

      if (companyInfo) {
        params["companyInfo.firstname"] = firstname || companyInfo.firstname;
        params["companyInfo.lastname"] = lastname || companyInfo.lastname;
        params["companyInfo.address"] = address || companyInfo.address;
        params["companyInfo.contactNumber"] =
          contactNumber || companyInfo.contactNumber;
      }

      // อัปเดตข้อมูลสินค้า
      if (productResult.data) {
        params.products = productResult.data.map((product) => {
          const quantity = productModel_id.includes(product._id.toString())
            ? products.find((p) => p.productModel_id === product._id).quantity
            : 0;
          return {
            productModel_id: product._id,
            quantity: quantity,
          };
        });
      }

      // เพิ่มส่วนที่เหลือ
      if (documentNumber) params.documentNumber = documentNumber;
      if (issuedDate) params.issuedDate = issuedDate;
      if (dueDate) params.dueDate = dueDate;
      if (paymentMethod) params.paymentMethod = paymentMethod;
      if (note) params.note = note;
      if (quotationStatus) params.quotationStatus = quotationStatus;
      if (extraDiscount) params.extraDiscount = extraDiscount;

      result = await SaleModel.quotation.updateSaleQuotation(
        updateConditions,
        params
      );
    }
  } catch (error) {}

  res.json(result);
};

// 👉 Delete
exports.deleteSaleQuotation = async (req, res) => {
  const { _id } = req.body;
  try {
    var result = new DataResponse();
    if (typeof _id !== "undefined") {
      // ค้นหา invoice ที่มี quotation_id เท่ากับ _id ของ quotation ที่ต้องการลบ
      const invoicesResult = await SaleModel.invoice.getAllSaleInvoices({
        quotation_id: _id,
      });

      if (invoicesResult.success && invoicesResult.data.length > 0) {
        // ถ้ามี invoice ที่มี quotation_id ตรงกับ _id ให้แจ้งเตือน
        result.doError(
          3,
          "Quotation cannot be deleted because it is associated with invoices."
        );
      } else {
        // ถ้าไม่มี invoice ที่มี quotation_id ตรงกับ _id ให้ลบ quotation
        result = await SaleModel.quotation.deleteSaleQuotation({
          _id: _id,
        });
      }
    } else {
      result.doError(2, "_id is required.");
    }
  } catch (e) {
    console.log(e);
    result.doError(
      0,
      "Something wrong server side, please contact system admin."
    );
  }

  res.json(result);
};
