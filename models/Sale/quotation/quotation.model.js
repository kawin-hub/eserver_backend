const SaleQuotation = require("./saleQuotations.schema");
const SaleInvoice = require("../invoice/saleInvoice.schema");
const { DataResponse } = require("../../general_data.model");
const productModel = require("../../Products/productModels.schema");
const categoryModel = require("../../Products/productCategories.schema");
const brandModel = require("../../Products/productBrands.schema");

// 👉 Get all

exports.getAllSaleQuotations = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};
    const queryResult = await SaleQuotation.aggregate([
      {
        $match: queryCondition,
      },
      {
        $lookup: {
          from: "SaleInvoices",
          localField: "_id",
          foreignField: "quotation_id",
          as: "invoice",
        },
      },
      {
        $addFields: {
          purchased: {
            $cond: {
              if: { $gt: [{ $size: "$invoice" }, 0] },
              then: 1,
              else: 0,
            },
          },
        },
      },

      {
        $project: {
          _id: 1,
          createdAt: 1,
          documentNumber: 1,
          documentName: 1,
          customerInfo: 1,
          quotationStatus: 1,
          currentStatus: 1,
          createdBy: 1,
          summary: 1,
          purchased: 1,
          pdfPath: 1,
        },
      },
      {
        $sort: { _id: -1 }, // Sort by issuedDate in descending order
      },
      {
        $skip: skip, // Skip first n documents
      },
      {
        $limit: limit, // Limit to n documents
      },
    ]);

    result.doSuccess(1);

    var countTotalRow = await SaleQuotation.countDocuments(
      params.queryCondition
    );

    result.doSuccess(1);

    result.data = {
      documents: queryResult,
    };
    result.data.limit = limit;
    result.data.page = skip / limit + 1;
    result.data.totalPage = Math.ceil(countTotalRow / limit);
    result.data.totalCount = countTotalRow;

    //totalCount
  } catch (e) {
    result.doError();
  }

  return result;
};

// 👉 Get by ID

exports.getSaleQuotationById = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleQuotation.findOne(params).lean();
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e.kind);
    if (e.kind == "ObjectId") {
      result.doError(0, "Please check your _id format");
    } else {
      result.doError(0);
    }
  }

  return result;
};

// 👉 Get by conditions

exports.getSaleQuotationByCondition = async (params, projector) => {
  var result = new DataResponse();

  try {
    result.data = await SaleQuotation.find(params, projector).lean();
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e.kind);
    if (e.kind == "ObjectId") {
      result.doError(0, "Please check your _id format");
    } else {
      result.doError(0);
    }
  }

  return result;
};

// 👉 Get by ID

exports.getNewSaleQuationId = async () => {
  var result = new DataResponse();

  try {
    result.data = await SaleQuotation.findOne(
      {},
      { documentNumber: -1 },
      { sort: { _id: -1 } }
    );
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e.kind);
    if (e.kind == "ObjectId") {
      result.doError(0, "Please check your _id format");
    } else {
      result.doError(0);
    }
  }

  return result;
};

// 👉 Insert/Post

exports.insertSaleQuotation = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleQuotation.create(params);
    result.data == null
      ? result.doSuccess(
          0,
          "Can't insert to database, please check your request!"
        )
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    e.code == 11000
      ? result.doError(6, "Quotation document number duplicate!")
      : result.doError();
  }

  return result;
};

// 👉 Put/Update

exports.updateSaleQuotation = async (conditions, params) => {
  var result = new DataResponse();
  try {
    result.data = await SaleQuotation.updateOne(conditions, params);
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    result.doError(0);
  }

  return result;
};

// 👉 Delete

exports.deleteSaleQuotation = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleQuotation.deleteOne(params);
    result.data.deletedCount == 0
      ? result.doSuccess(3, "this _id isn't allowed to be removed!")
      : result.doSuccess(1);
  } catch (e) {
    result.doError();
  }

  return result;
};

exports.getCountQuotation = async (params) => {
  var result = new DataResponse();

  try {
    result.data = await SaleQuotation.find(params, {
      _id: 1,
      currentStatus: 1,
    });
    result.doSuccess();
  } catch (e) {
    result.doError(0);
  }

  return result;
};

//********** For Dashboard ************/

exports.getSaleQuotationTotalByConditions = async (params) => {
  var result = new DataResponse();
  try {
    result.data = await SaleQuotation.aggregate([
      {
        $match: params,
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$summary.totalPrice" },
        },
      },
    ]);

    if (result.data) result.doSuccess();
  } catch (e) {
    result.doError();
  }

  return result;
};

exports.getBestSellingProduct = async (params) => {
  var result = new DataResponse();
  try {
    result.data = await SaleQuotation.aggregate([
      {
        $match: {
          currentStatus: "purchased",
          purchesedDate: params?.purchesedDate,
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$products.modelCode",
          totalQuantity: { $sum: "$products.quantity" },
          totalPrice: { $sum: "$products.price" },
          name: { $first: "$products.name" },
          modelCode: { $first: "$products.modelCode" },
          avatar: { $first: "$products.avatar" },
        },
      },
      {
        $sort: {
          totalPrice: -1,
        },
      },
    ]);
    if (result.data) result.doSuccess();
  } catch (e) {
    console.log(e);
    result.doError();
  }

  return result;
};

exports.getTopBuyer = async (params) => {
  var result = new DataResponse();
  try {
    result.data = await SaleQuotation.aggregate([
      {
        $match: {
          currentStatus: "purchased",
          purchesedDate: params?.purchesedDate,
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$customerInfo.lead_id",
          totalQuantity: { $sum: "$products.quantity" },
          totalPrice: { $sum: "$products.price" },
          totalDiscount: { $sum: "$products.discountBaht" },
          companyName: { $first: "$customerInfo.companyInfo.companyName" },
          name: { $first: "$customerInfo.companyInfo.firstname" },
          countPurchesed: { $sum: 1 },
          lineId: { $first: "$customerInfo.lineId" },
        },
      },
      {
        $sort: {
          totalPrice: -1,
        },
      },
    ]);
    if (result.data) result.doSuccess();
  } catch (e) {
    console.log(e);
    result.doError();
  }

  return result;
};

exports.getBestSellingCategorys = async (params) => {
  var result = new DataResponse();
  try {
    result.data = await SaleQuotation.aggregate([
      {
        $lookup: {
          from: "ProductModel",
          localField: "products._id",
          foreignField: "_id",
          as: "productDetail",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $unwind: "$productDetail",
      },
      {
        $lookup: {
          from: "ProductBrands",
          localField: "productDetail.brand_id",
          foreignField: "_id",
          as: "brandDetail",
        },
      },
      {
        $lookup: {
          from: "ProductCategories",
          localField: "productDetail.category_ids",
          foreignField: "_id",
          as: "categoryDetail",
        },
      },
      {
        $match: {
          currentStatus: "purchased",
          purchesedDate: params?.purchesedDate,
        },
      },
      {
        $group: {
          _id: "$products._id",
          totalQuantity: { $sum: "$products.quantity" },
          totalPrice: { $sum: "$products.price" },
          brand_id: { $first: "$productDetail.brand_id" },
          brandName: { $first: "$brandDetail.name" },
          category_id: { $first: "$productDetail.category_ids" },
          categoryName: { $first: "$categoryDetail.name" },
        },
      },
      {
        $sort: {
          totalPrice: -1,
        },
      },
    ]);
    if (result.data) result.doSuccess();

    /*  if (result.data.length > 0) {
      var productsIdInArray = [];
      for (var i = 0; i < result.data.length; i++) {
        productsIdInArray[i] = result.data[i]._id;
      }
      var resultModelFromDB = await productModel.find(
        { _id: productsIdInArray },
        {
          _id: -1,
          category_ids: -1,
          brand_id: -1,
        }
      );
      var categoryInArray = [];
      var brandsInArray = [];
      for (var i = 0; i < resultModelFromDB.length; i++) {
        categoryInArray[i] = resultModelFromDB[i].category_ids;
        brandsInArray[i] = resultModelFromDB[i].brand_id;
      }
      var resultCategoryFromDB = await categoryModel.find(
        { _id: categoryInArray },
        {
          name: -1,
        }
      );
      var resultBrandsFromDB = await brandModel.find(
        { _id: brandsInArray },
        {
          name: -1,
          avatar: -1,
        }
      );

      for (var i = 0; i < result.data.length; i++) {
        for (var j = 0; j < resultModelFromDB.length; j++) {
          if (
            result.data[i]._id.toString() == resultModelFromDB[j]._id.toString()
          ) {
            result.data[i]["category_ids"] = resultModelFromDB[j].category_ids;
            break;
          }
        }
      }
    } */
  } catch (e) {
    console.log(e);
    result.doError();
  }

  return result;
};

exports.getBestSellingCategory = async (params) => {
  var result = new DataResponse();
  try {
    result.data = await SaleQuotation.aggregate([
      {
        $lookup: {
          from: "ProductModel",
          localField: "products._id",
          foreignField: "_id",
          as: "productDetail",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $unwind: "$productDetail",
      },
      {
        $lookup: {
          from: "ProductCategories",
          localField: "productDetail.category_ids",
          foreignField: "_id",
          as: "categoryDetail",
        },
      },
      {
        $match: {
          currentStatus: "purchased",
          /* purchesedDate: params?.purchesedDate, */
        },
      },
      {
        $addFields: {
          totalProductPrice: {
            $multiply: ["$products.quantity", "$products.price"],
          },
        },
      },
      {
        $group: {
          _id: "$categoryDetail._id",
          quantity: { $sum: "$products.quantity" },
          totalPrice: { $sum: "$totalProductPrice" },
          name: { $first: "$categoryDetail.name" },
        },
      },
      {
        $sort: {
          totalPrice: -1,
        },
      },
    ]);
    if (result.data) result.doSuccess();
  } catch (e) {
    console.log(e);
    result.doError();
  }

  return result;
};

exports.getBestSellingBrand = async (params) => {
  var result = new DataResponse();
  try {
    result.data = await SaleQuotation.aggregate([
      {
        $lookup: {
          from: "ProductModel",
          localField: "products._id",
          foreignField: "_id",
          as: "productDetail",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $unwind: "$productDetail",
      },
      {
        $lookup: {
          from: "ProductBrands",
          localField: "productDetail.brand_id",
          foreignField: "_id",
          as: "brandDetail",
        },
      },
      {
        $match: {
          currentStatus: "purchased",
          purchesedDate: params?.purchesedDate,
        },
      },
      {
        $group: {
          _id: "$brandDetail._id",
          totalQuantity: { $sum: "$products.quantity" },
          totalPrice: { $sum: "$products.price" },
          name: { $first: "$brandDetail.name" },
        },
      },
      {
        $sort: {
          totalPrice: -1,
        },
      },
    ]);
    if (result.data) result.doSuccess();
  } catch (e) {
    console.log(e);
    result.doError();
  }

  return result;
};
