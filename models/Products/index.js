const ProductCategory = require("./productCategories.schema");
const ProductBrand = require("./productBrands.schema");
const ProductModel = require("./productModels.schema");

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

const getProductModels = async (param = {}) => {
  var productModels = null;
  try {
    productModels = await ProductModel.find(param).lean();
  } catch (e) {
    productModels = e;
  }
  return productModels;
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
  }

  return model;
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
};
