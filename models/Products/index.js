const ProductCategory = require("./productCategories.schema");
const ProductBrand = require("./productBrands.schema");
const ProductModel = require("./productModels.schema");
const { DataResponse } = require("../general_data.model");

// ProductCategories
const getAllProductCategories = async () => {
  var productCategories = null;
  try {
    productCategories = await ProductCategory.find().lean();
  } catch (e) {
    productCategories = e;
  }
  return productCategories;
};

const insertProductCategory = async (data) => {
  var productCategory = new ProductCategory(data);
  var category = null;

  try {
    category = await productCategory.save();
  } catch (e) {
    category = e;
  }

  return category;
};

const updateProductCategory = async (_id, update) => {
  var category = null;

  try {
    category = await ProductCategory.findByIdAndUpdate(_id, update);
  } catch (e) {
    category = e;
  }

  return category;
};

const deleteProductCategory = async (data) => {
  var result = null;
  try {
    result = await ProductCategory.findByIdAndRemove(data);
  } catch (e) {
    result = e;
  }

  return result;
};

//ProductBrands
const getProductBrands = async () => {
  var productBrands = null;
  try {
    productBrands = await ProductBrand.find().lean();
  } catch (e) {
    productBrands = e;
  }
  return productBrands;
};

const insertProductBrand = async (data) => {
  var productBrand = new ProductBrand(data);
  var brand = null;

  try {
    brand = await productBrand.save();
  } catch (e) {
    brand = e;
  }

  return brand;
};

const updateProductBrand = async (_id, update) => {
  var brand = null;

  try {
    brand = await ProductBrand.findByIdAndUpdate(_id, update);
  } catch (e) {
    brand = e;
  }

  return brand;
};

const deleteProductBrand = async (data) => {
  var result = null;
  try {
    result = await ProductBrand.findByIdAndRemove(data);
  } catch (e) {
    result = e;
  }

  return result;
};

//ProductModel

const insertProductModel = async (data) => {
  var productModel = new ProductModel(data);
  var model = null;

  try {
    model = await productModel.save();
  } catch (e) {
    model = e;
  }

  return model;
};

const getProductModels = async (params) => {
  var result = new DataResponse();
  try {
    var limit = parseInt(params.limit);
    var page = parseInt(params.page) ? parseInt(params.page) : 1;
    var skip = (page - 1) * limit;
    skip = skip < 1 ? 0 : skip;

    var queryCondition =
      params.queryCondition !== undefined ? params.queryCondition : {};

    const queryResult = await ProductModel.find(
      queryCondition,
      params.projector
    )
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .lean();

    result.doSuccess(1);

    var countTotalRow = await ProductModel.countDocuments(
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
    console.log(e);
    result.doError();
  }

  return result;
};

const getProductModelsByParams = async (param = {}, projection = {}) => {
  var result = new DataResponse();
  try {
    result.data = await ProductModel.findOne(param, projection).lean();
    result.data == null
      ? result.doSuccess(2, "Not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    if (e.kind == "ObjectId") {
      result.doError(0, "Please check your _id format");
    } else {
      result.doError(0);
    }
  }
  return result;
};

const deleteProductModel = async (data) => {
  var result = null;
  try {
    result = await ProductModel.findByIdAndRemove(data);
  } catch (e) {
    result = e;
    result.error = true;
  }

  return result;
};

const updateProductModel = async (_id, update) => {
  var model = null;
  try {
    model = await ProductModel.findByIdAndUpdate(_id, update);
  } catch (e) {
    model = e;
    /* console.log(e); */
  }

  return model;
};

const getProductsbyArrayId = async (product_ids, projection = {}) => {
  var result = new DataResponse();
  try {
    result.data = await ProductModel.find(
      { _id: { $in: product_ids } },
      projection
    ).lean();
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    if (e.kind == "ObjectId") {
      result.doError(0, "Please check your _id format");
    } else {
      result.doError(0);
    }
  }

  return result;
};

const updateProductDiscountGroup = async (conditions, params) => {
  console.log("In Model ");
  var result = new DataResponse();
  try {
    result.data = await ProductModel.findOneAndUpdate(conditions, params);
    result.data == null
      ? result.doSuccess(2, "_id not found in database")
      : result.doSuccess(1);
  } catch (e) {
    console.log(e);
    result.doError(0);
  }

  return result;
};

module.exports = {
  insertProductCategory,
  getAllProductCategories,
  insertProductBrand,
  getProductBrands,
  deleteProductBrand,
  updateProductBrand,
  updateProductCategory,
  deleteProductCategory,
  insertProductModel,
  getProductModels,
  deleteProductModel,
  updateProductModel,
  getProductsbyArrayId,
  getProductModelsByParams,
  updateProductDiscountGroup,
};
