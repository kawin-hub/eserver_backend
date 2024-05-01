//Quotation model
let SaleModel = require("../../models/Sale");
let ProductModel = require("../../models/Products");
let { general, upload } = require("../../middleware");
const { DataResponse } = require("../../models/general_data.model");
const { Validator } = require("node-input-validator");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const { LineClient } = require("../../services/third_party/line");

const {
  createInvoice,
} = require("../../services/file_management/invoice.service");

// 👉 Get all or by ID
exports.getSaleQuotations = async (req, res) => {
  var result = new DataResponse();

  try {
    const { _id, txtSearch, quotationStatus, currentStatus, lead_id } =
      req.query;

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
        ];

        params.queryCondition["$or"] = orConditions;
      }

      if (typeof quotationStatus !== "undefined") {
        params.queryCondition["quotationStatus"] = quotationStatus;
      }

      if (typeof currentStatus !== "undefined") {
        params.queryCondition["currentStatus"] = currentStatus;
      }

      if (typeof lead_id !== "undefined") {
        params.queryCondition["customerInfo.lead_id"] = new ObjectId(lead_id);
      }

      result = await SaleQuotationModel.getAllSaleQuotations(params);
    }
  } catch (error) {
    result.doError(7, error.message);
    console.log(error);
  }

  res.json(result);
};

exports.getNewQuationId = async (req, res) => {
  var result = new DataResponse();

  try {
    result = await SaleModel.quotation.getNewSaleQuationId();

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
      extraDiscount: "numeric",
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
              description: 1,
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

            // ************* Create pdf and save ****************//
            const quotation = {
              header: {
                fileType: "Quatation",
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
              items: productResult.data,
              extraDiscount: extraDiscountFloat,
              note: note,
            };

            const pdfName =
              documentNumber +
              "-" +
              (companyInfo.companyName != ""
                ? companyInfo.companyName
                : companyInfo.firstname) +
              "-" +
              Date.now() +
              ".pdf";
            const pdfPath = "assets/documents/quotations/" + pdfName;
            createInvoice(quotation, pdfPath);
            ///////////////////////

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
                  taxId: companyInfo.taxId,
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
              pdfPath: pdfPath,
            };

            result = await SaleQuotationModel.insertSaleQuotation(
              insertQuotationparams
            );

            if (result.code != 1) {
              fs.rmSync(pdfPath, {
                force: true,
              });
            }
          } else {
            result.doError(5, "product_id is not found!");
          }
        } else {
          result.doError(5, "companyInfo_id is not found!");
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
      issuedDate: "dateFormat:YYYY-MM-DD",
      dueDate: "dateFormat:YYYY-MM-DD",
      quotationStatus: "in:warm,hot,cold,done",
      extraDiscount: "numeric",
    });
    const matched = await validation.check();

    if (matched) {
      const {
        _id,
        lead_id,
        documentNumber,
        issuedDate,
        dueDate,
        firstname,
        lastname,
        address,
        contactNumber,
        paymentMethod,
        note,
        quotationStatus,
        extraDiscount,
      } = req.body;

      //check DB
      if (_id !== "undefined") {
        var leadResult = {
          code: 1,
        };
        if (lead_id) {
          leadResult = await SaleModel.lead.getSaleLeadById({
            _id: lead_id,
          });
        }

        if (leadResult.code == 1) {
          //update
          const updateConditions = {
            _id: _id,
          };

          var params = {};

          if (firstname)
            params["customerInfo.companyInfo.firstname"] = firstname;
          if (lastname) params["customerInfo.companyInfo.lastname"] = lastname;
          if (contactNumber)
            params["customerInfo.companyInfo.contactNumber"] = contactNumber;
          if (address) params["customerInfo.companyInfo.address"] = address;
          if (documentNumber) params.documentNumber = documentNumber;
          if (issuedDate) params.issuedDate = issuedDate;
          if (dueDate) params.dueDate = dueDate;
          if (paymentMethod) params.paymentMethod = paymentMethod;
          if (note) params.note = note;
          if (quotationStatus) params.quotationStatus = quotationStatus;
          if (extraDiscount) params["summary.extraDiscount"] = extraDiscount;

          result = await SaleModel.quotation.updateSaleQuotation(
            updateConditions,
            params
          );
        } else {
          result.doError(5, "lead_id is not found!");
        }
      } else {
        result.doError(5, "_id is not found!");
      }
    }
  } catch (error) {}

  res.json(result);
};

/// 👉 Delete
exports.deleteSaleQuotation = async (req, res) => {
  const { _id } = req.body;
  try {
    var result = new DataResponse();
    if (typeof _id !== "undefined") {
      // หา invoice ที่เกี่ยวข้องกับ quotation นี้
      const invoicesResult = await SaleModel.invoice.getSaleInvoiceByConditions(
        {
          quotation_id: _id,
        }
      );
      // ตรวจสอบว่ามี invoice ที่มี quotation_id เท่ากับ _id หรือไม่
      if (invoicesResult.code == 1 && invoicesResult.data.length == 0) {
        var resultQuotationDeleted =
          await SaleModel.quotation.getSaleQuotationById({
            _id: new ObjectId(_id),
          });

        result = await SaleModel.quotation.deleteSaleQuotation({
          _id: _id,
        });

        if (result.code == 1) {
          if (resultQuotationDeleted.data?.pdfPath) {
            upload.deleteFiles([resultQuotationDeleted.data.pdfPath]);
          }
        }
      } else {
        // ถ้ามี invoice ที่มี quotation_id เท่ากับ _id ให้แจ้งเตือนว่าไม่สามารถลบได้
        result.doError(
          3,
          "Quotation cannot be deleted because it contains related invoices."
        );
      }
    } else {
      result.doError(2, "_id is required.");
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
};

/// Send pdf to line

exports.sendQuotationToLine = async (req, res) => {
  var result = new DataResponse();

  try {
    const { quotation_id } = req.body;

    if (typeof quotation_id != "undefined") {
      var SaleQuotationModel = SaleModel.quotation;
      result = await SaleQuotationModel.getSaleQuotationById({
        _id: quotation_id,
      });

      if (result.code == 1) {
        const line_id = result.data.customerInfo.lineId;
        const pdfPath = result.data.pdfPath;

        await LineClient.pushMessage(line_id, {
          type: "template",
          altText: "ใบเสนอราคา ฟิล์มไฟฟ้า",
          template: {
            type: "buttons",
            title: "ใบเสนอราคา",
            text: "กดปุ่มด้านล่างเพื่อดูใบเสนอราคา",
            actions: [
              {
                type: "uri",
                label: "ใบเสนอราคา 83%",
                uri: "https://inhouse.co.th",
              },
              {
                type: "uri",
                label: "ใบเสนอราคา 89%",
                uri: "http://example.com/page/123",
              },
              {
                type: "uri",
                label: "ใบเสนอราคา 92%",
                uri: "http://example.com/page/123",
              },
              {
                type: "uri",
                label: "ใบเสนอราคา 93%",
                uri: "http://example.com/page/123",
              },
            ],
          },
        });
      } else {
        result.doError(5, "This quotation_id is not exist!");
      }
    }
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};
