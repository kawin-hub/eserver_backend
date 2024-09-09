//User model
let productModel = require("../models/Products");
let dotenv = require("dotenv");
let { upload } = require("../middleware");
let SaleModel = require("../models/Sale");
let ProductModel = require("../models/Products/index");
let { general } = require("../middleware");
const fs = require("fs");
const { filter } = require("compression");
const { DataResponse } = require("../models/general_data.model");
const { Validator } = require("node-input-validator");

dotenv.config();
// Insert productCategory

const insertProductCategory = async (req, res, next) => {
  var uploadRes = await upload.uploadFiles(req, res); // convert post multi-part
  let { name, description, status } = req.body;

  let result = null;
  let message = "Insert failed";
  let statusCode = 400;

  if (name !== undefined) {
    name = name ? name : "";
    description = description ? description : "";
    status = status != "" || status !== undefined ? status : "inactive";

    result = await productModel.insertProductCategory({
      name,
      description,
      status,
    });

    if (result.code != 11000) {
      statusCode = 200;
      message = "Insert product category successfully";
    } else {
      message = "Category name is duplicate!";
    }
  } else {
    message = "name, description, status is required!";
  }

  res.status(statusCode).send({ message, result });
};

const getAllProductCategories = async (req, res, next) => {
  var productCategories = await productModel.getAllProductCategories();
  res.status(200).send({
    message: "Get product categories successfully!",
    productCategories,
  });
};

const updateProductCategory = async (req, res, next) => {
  var uploadRes = await upload.uploadFiles(req, res); // convert post multi-part

  let result = null;
  let message = "Update failed";
  let statusCode = 400;
  let { name, description, status, _id } = req.body;

  if (name !== undefined) {
    name = name ? name : "";
    description = description ? description : "";
    status = status != "" || status !== undefined ? status : "inactive";

    let dataUpdate = {
      name,
      description,
      status,
    };

    result = await productModel.updateProductCategory(_id, dataUpdate);

    if (result.code != 11000 && result.errors === undefined) {
      statusCode = 200;
      message = "Product category has updated successfully";
    } else if (result.code == 11000) {
      message = "Category name is duplicate!";
    } else if (result.errors) {
      message = result.errors;
      result = [];
    } else {
      message = "Ops!!! something has gone wrong.";
    }
  } else {
    message = "name, description, active is required!";
  }

  if (statusCode != 200) {
    for (let i = 0; i < req.files.length; i++) {
      fs.rmSync(req.files[i].path, {
        force: true,
      });
    }
  }

  res.status(statusCode).send({ message, result });
};

const deleteProductCategory = async (req, res, next) => {
  let { _id } = req.body;

  let result = null;
  let message = "Insert failed";
  let statusCode = 400;

  if (_id !== undefined) {
    result = await productModel.deleteProductCategory({ _id: _id });

    if (result != null) {
      statusCode = 200;
      message = "Delete product category successfully";
    } else {
      message = "Ops!!! something has gone wrong.";
    }
  } else {
    message = "_id is required!";
  }

  res.status(statusCode).send({ message, result });
};

// Get brands
const getProductBrands = async (req, res, next) => {
  var productBrands = await productModel.getProductBrands();

  res.status(200).send({
    message: "Get product Brands successfully!",
    productBrands,
  });
};

//Insert brands
const insertProductBrand = async (req, res, next) => {
  var uploadRes = await upload.uploadFiles(req, res, [
    {
      name: "avatar",
      path: "./assets/images/product/brands",
      maxCount: 1,
      allowType: ["jpeg", "jpg", "png"],
    },
  ]);
  let { name, description, status, avatar } = req.body;

  let result = null;
  let message = "Insert failed";
  let statusCode = 400;

  if (uploadRes.success) {
    if (name !== undefined) {
      name = name ? name : "";
      description = description ? description : "";
      status = status != "" || status !== undefined ? status : "inactive";

      avatar =
        req.files.avatar !== undefined && req.files.avatar[0]
          ? req.files.avatar[0].path
          : "";
      result = await productModel.insertProductBrand({
        name,
        description,
        status,
        avatar,
      });

      if (result.code != 11000 && result.errors === undefined) {
        statusCode = 200;
        message = "Product brand inserted successfully";
      } else if (result.code == 11000) {
        message = "Brand name is duplicate!";
      } else if (result.errors) {
        message = result.errors;
        result = [];
      } else {
        message = "Ops!!! something has gone wrong.";
      }
    } else {
      message = "name, description, active is required!";
    }

    if (statusCode != 200) {
      try {
        for (let i = 0; i < req.files.avatar.length; i++) {
          fs.rmSync(req.files.avatar[i].path, {
            force: true,
          });
        }
      } catch (e) {}
    }
  } else {
    message = uploadRes.message;
  }

  res.status(statusCode).send({ message, result });
};

const updateProductBrand = async (req, res, next) => {
  var uploadRes = await upload.uploadFiles(req, res, [
    {
      name: "avatar",
      path: "./assets/images/product/brands",
      maxCount: 1,
      allowType: ["jpeg", "jpg", "png"],
    },
  ]);

  let result = null;
  let message = "Update failed";
  let statusCode = 400;
  let { name, description, status, avatar, _id } = req.body;

  if (uploadRes.success) {
    if (name !== undefined) {
      name = name ? name : "";
      description = description ? description : "";
      status = status != "" || status !== undefined ? status : "inactive";

      try {
        if (uploadRes.success)
          avatar = req.files.avatar[0] ? req.files.avatar[0].path : "";
      } catch (e) {}

      let dataUpdate = {
        name,
        description,
        status,
      };

      if (avatar != "") {
        dataUpdate.avatar = avatar;
      }

      result = await productModel.updateProductBrand(_id, dataUpdate);

      if (result.code != 11000 && result.errors === undefined) {
        statusCode = 200;
        message = "Product brand has updated successfully";
      } else if (result.code == 11000) {
        message = "Brand name is duplicate!";
      } else if (result.errors) {
        message = result.errors;
        result = [];
      } else {
        message = "Ops!!! something has gone wrong.";
      }
    } else {
      message = "name, description, active is required!";
    }

    try {
      // delete old image from path
      if (avatar != "") {
        fs.rmSync(result.avatar, {
          force: true,
        });
      }
    } catch (e) {}

    if (statusCode != 200) {
      // delete uploaded images if query error
      try {
        for (let i = 0; i < req.files.avatar.length; i++) {
          fs.rmSync(req.files.avatar[i].path, {
            force: true,
          });
        }
      } catch (e) {}
    }
  } else {
    message = uploadRes.message;
  }

  res.status(statusCode).send({ message, result });
};

const deleteProductBrand = async (req, res, next) => {
  let { _id } = req.body;

  let result = null;
  let message = "Delete failed";
  let statusCode = 400;

  if (_id !== undefined) {
    result = await productModel.deleteProductBrand({ _id: _id });

    if (result != null) {
      try {
        fs.rmSync(result.avatar, {
          force: true,
        });
      } catch (e) {}
      statusCode = 200;
      message = "Delete product brand successfully";
    } else {
      message = "Ops!!! something has gone wrong.";
    }
  } else {
    message = "_id is required!";
  }

  res.status(statusCode).send({ message, result });
};

const insertProductModel = async (req, res, next) => {
  var uploadRes = await upload.uploadFiles(req, res, [
    {
      name: "avatar",
      path: "./assets/images/product/models/avatars",
      maxCount: 1,
      allowType: ["jpeg", "jpg", "png"],
    },
    {
      name: "images",
      path: "./assets/images/product/models/products",
      allowType: ["jpeg", "jpg", "png"],
    },
    {
      name: "documents",
      path: "./assets/documents/product/models",
      allowType: ["pdf"],
    },
  ]);

  let result = null;
  let message = "Insert failed";
  let statusCode = 400;

  if (uploadRes.success) {
    let {
      modelCode,
      name,
      description,
      status,
      price,
      installationPrice,
      minimum,
      maximum,
      defaultWarrantyNumber,
      defaultWarrantyUnit,
      brand_id,
      categories,
      stock,
      relatedModels,
      subcontractorInstallationPrice,
    } = req.body;

    let category_ids = [];

    if (name !== undefined) {
      name = name ? name : "";
      description = description ? description : "";
      status = status != "" || status !== undefined ? status : "inactive";
      brand_id = brand_id ? brand_id : "";
      price = price != "" || price !== undefined ? price : 0;
      installationPrice =
        installationPrice != "" || installationPrice !== undefined
          ? installationPrice
          : 0;
      subcontractorInstallationPrice =
        subcontractorInstallationPrice != "" ||
        subcontractorInstallationPrice !== undefined
          ? subcontractorInstallationPrice
          : 0;
      minimum = minimum != "" || minimum !== undefined ? minimum : 0;
      maximum = maximum != "" || maximum !== undefined ? maximum : 0;
      stock = stock != 0 || stock !== undefined ? stock : 0;
      defaultWarrantyNumber =
        defaultWarrantyNumber != "" && defaultWarrantyNumber !== undefined
          ? defaultWarrantyNumber
          : 1;
      defaultWarrantyUnit =
        defaultWarrantyUnit == "m" ? defaultWarrantyUnit : "y";

      if (categories !== undefined && categories != "") {
        category_ids = categories.split(",");
      }

      if (relatedModels !== undefined && relatedModels != "") {
        relatedModels = relatedModels.split(",");
      } else {
        relatedModels = [];
      }

      let avatar = null;
      let images = [];
      try {
        avatar =
          req.files.avatar !== undefined && req.files.avatar[0]
            ? req.files.avatar[0].path
            : "";
        if (req.files.images) {
          req.files.images.forEach((element) => {
            images[images.length] = {
              name: element.originalname,
              path: element.path,
            };
          });
        }
      } catch (e) {}

      let documents = [];
      try {
        if (req.files.documents) {
          req.files.documents.forEach((element) => {
            documents[documents.length] = {
              name: element.originalname,
              path: element.path,
            };
          });
        }
      } catch (e) {}

      var defaultWarranty = {
        amount: defaultWarrantyNumber,
        unit: defaultWarrantyUnit,
      };

      result = await productModel.insertProductModel({
        name,
        description,
        status,
        modelCode,
        price,
        installationPrice,
        minimum,
        maximum,
        defaultWarranty,
        avatar,
        images,
        brand_id,
        category_ids,
        stock,
        relatedModels,
        documents,
      });

      if (result.code != 11000 && result.errors === undefined) {
        statusCode = 200;
        message = "Product model inserted successfully";
      } else if (result.code == 11000) {
        message = "Model code is duplicate!";
      } else if (result.errors) {
        message = result.errors;
        result = [];
      } else {
        message = "Ops!!! something has gone wrong.";
      }
    } else {
      message = "name, description, active is required!";
    }
  } else {
    message = uploadRes.message;
  }

  res.status(statusCode).send({ message, result });
};

const getProductModels = async (req, res, next) => {
  var result = new DataResponse();

  try {
    const { _id, txtSearch, brand_id, category_id } = req.query;

    // get all
    var pageOption = general.checkPageAndLimit(req.query.page, req.query.limit);

    var params = {
      page: pageOption.page,
      limit: pageOption.limit,
      queryCondition: {},
      projector: {
        _id: 1,
        modelCode: 1,
        name: 1,
        brand_id: 1,
        category_ids: 1,
        price: 1,
        discountGroup: 1,
        description: 1,
        installationPrice: 1,
        status: 1,
        relatedModels: 1,
        images: 1,
        documents: 1,
        stock: 1,
        minimum: 1,
        maximum: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    };

    if (typeof brand_id !== "undefined") {
      params.queryCondition["brand_id"] = brand_id;
    }

    if (typeof category_id !== "undefined") {
      params.queryCondition["category_ids"] = category_id;
    }

    result = await productModel.getProductModels(params);
  } catch (error) {
    console.log(error);
  }

  res.json(result);
};

const deleteProductModel = async (req, res, next) => {
  let { _id } = req.body;

  let result = null;
  let message = "Delete failed";
  let statusCode = 400;

  if (_id !== undefined) {
    result = await productModel.deleteProductModel({ _id: _id });

    if (result != null && !result.error) {
      try {
        fs.rmSync(result.avatar, {
          force: true,
        });
      } catch (e) {
        console.log(e);
      }

      try {
        for (let i = 0; i < result.images.length; i++) {
          fs.rmSync(result.images[i].path, {
            force: true,
          });
        }
      } catch (e) {
        console.log(e);
      }

      try {
        for (let i = 0; i < result.documents.length; i++) {
          fs.rmSync(result.documents[i].path, {
            force: true,
          });
        }
      } catch (e) {
        console.log(e);
      }

      statusCode = 200;
      message = "Delete product model successfully";
    } else {
      message = "Ops!!! something has gone wrong.";
    }
  } else {
    message = "_id is required!";
  }

  res.status(statusCode).send({ message, result });
};

const updateProductModel = async (req, res, next) => {
  var uploadRes = await upload.uploadFiles(req, res, [
    {
      name: "avatar",
      path: "./assets/images/product/models/avatars",
      maxCount: 1,
      allowType: ["jpeg", "jpg", "png"],
    },
    {
      name: "images",
      path: "./assets/images/product/models/products",
      allowType: ["jpeg", "jpg", "png"],
    },
    {
      name: "documents",
      path: "./assets/documents/product/models",
      allowType: ["pdf"],
    },
  ]);

  let result = null;
  let message = "Update failed";
  let statusCode = 400;

  let {
    _id,
    modelCode,
    name,
    description,
    status,
    price,
    installationPrice,
    minimum,
    maximum,
    defaultWarrantyNumber,
    defaultWarrantyUnit,
    brand_id,
    categories,
    stock,
    relatedModels,
    subcontractorInstallationPrice,
    deletedImage,
    deletedPdf,
  } = req.body;
  var myModel = await productModel.getProductModels({ _id: _id });

  let category_ids = [];

  if (uploadRes.success) {
    name = name ? name : "";
    description = description ? description : "";
    status = status != "" || status !== undefined ? status : "inactive";
    brand_id = brand_id ? brand_id : "";
    price = price != "" || price !== undefined ? price : 0;
    installationPrice =
      installationPrice != "" || installationPrice !== undefined
        ? installationPrice
        : 0;
    subcontractorInstallationPrice =
      subcontractorInstallationPrice != "" ||
      subcontractorInstallationPrice !== undefined
        ? subcontractorInstallationPrice
        : 0;
    minimum = minimum != "" || typeof minimum !== "undefined" ? minimum : 0;

    maximum = maximum != "" || typeof maximum !== "undefined" ? maximum : 0;
    stock = stock != 0 || typeof stock !== "undefined" ? stock : 0;

    minimum = isNaN(minimum) ? 0 : minimum;
    maximum = isNaN(maximum) ? 0 : maximum;

    defaultWarrantyNumber =
      defaultWarrantyNumber != "" && defaultWarrantyNumber !== undefined
        ? defaultWarrantyNumber
        : 1;
    defaultWarrantyUnit =
      defaultWarrantyUnit == "m" ? defaultWarrantyUnit : "y";

    if (categories !== undefined && categories != "") {
      category_ids = categories.split(",");
    }

    // relatedModels to array
    if (relatedModels !== undefined && relatedModels != "") {
      relatedModels = relatedModels.split(",");
    } else {
      relatedModels = [];
    }

    // deletedImage to array
    if (deletedImage !== undefined && deletedImage != "") {
      deletedImage = deletedImage.split(",");
    } else {
      deletedImage = [];
    }

    // deletedPdf to array
    if (deletedPdf !== undefined && deletedPdf != "") {
      deletedPdf = deletedPdf.split(",");
    } else {
      deletedPdf = [];
    }

    let avatar = null;
    let images = [];
    try {
      avatar =
        req.files.avatar !== undefined && req.files.avatar[0]
          ? req.files.avatar[0].path
          : myModel[0].avatar;

      if (req.files.images) {
        req.files.images.forEach((element) => {
          images[images.length] = {
            name: element.originalname,
            path: element.path,
          };
        });
      }
    } catch (e) {}

    let documents = [];
    try {
      if (req.files.documents) {
        req.files.documents.forEach((element) => {
          documents[documents.length] = {
            name: element.originalname,
            path: element.path,
          };
        });
      }
    } catch (e) {}

    var defaultWarranty = {
      amount: defaultWarrantyNumber,
      unit: defaultWarrantyUnit,
    };

    if (!myModel.data.documents.length) {
      // Incorrect _id
    } else {
      let dataUpdate = null;

      if (images.length) {
        // Insert new upload images
        dataUpdate = {
          $push: {
            images: {
              $each: images,
            },
          },
        };
        result = await productModel.updateProductModel(_id, dataUpdate);
      }

      if (documents.length) {
        // Insert new upload documents
        dataUpdate = {
          $push: {
            documents: {
              $each: documents,
            },
          },
        };
        result = await productModel.updateProductModel(_id, dataUpdate);
      }

      if (deletedImage.length) {
        // Delete images

        dataUpdate = {
          $pull: {
            images: {
              _id: deletedImage,
            },
          },
        };
        result = await productModel.updateProductModel(_id, dataUpdate);

        if (result) {
          myModel[0].images.forEach((image) => {
            deletedImage.forEach((dlImg) => {
              if (image._id == dlImg) {
                try {
                  fs.rmSync(image.path, {
                    force: true,
                  });
                } catch (e) {}
              }
            });
          });
        }
      }

      if (deletedPdf.length) {
        // Delete documents
        dataUpdate = {
          $pull: {
            documents: {
              _id: deletedPdf,
            },
          },
        };
        result = await productModel.updateProductModel(_id, dataUpdate);

        if (result) {
          myModel[0].documents.forEach((document) => {
            deletedPdf.forEach((dlDoc) => {
              if (document._id == dlDoc) {
                try {
                  fs.rmSync(document.path, {
                    force: true,
                  });
                } catch (e) {}
              }
            });
          });
        }
      }

      dataUpdate = {
        name,
        description,
        status,
        modelCode,
        price,
        installationPrice,
        minimum,
        maximum,
        defaultWarranty,
        avatar,
        brand_id,
        category_ids,
        stock,
        relatedModels,
      };
      result = await productModel.updateProductModel(_id, dataUpdate);
    }

    /* try {
      for (let i = 0; i < deletedImage.length; i++) {
        fs.rmSync(result.images[i], {
          force: true,
        });
      }
    } catch (e) {
      console.log(e);
    } */
  }

  res.json({
    message: "Response from server.",
  });
};

const updateDiscountGroup = async (req, res, next) => {
  var result = new DataResponse();

  try {
    const validation = new Validator(req.body, {
      _id: "required",
      discountGroup: "required|array",
    });

    const matched = await validation.check();
    if (matched) {
      const { _id, discountGroup } = req.body;

      const conditions = { _id: _id };

      var params = {
        discountGroup: discountGroup,
      };

      result = await productModel.updateProductDiscountGroup(
        conditions,
        params
      );
    } else {
      result.doError(2, validation.errors);
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

const getBestSellingInProduct = async (req, res) => {
  var result = new DataResponse();

  try {
    var { startDate, endDate } = req.query;
    if (typeof startDate !== "undefined" && typeof endDate !== "undefined") {
      if (typeof startDate === "undefined") {
        var beginDate = new Date();
        beginDate.setDate(1);
        startDate = general.formatDate(beginDate);
      }

      if (typeof endDate === "undefined") {
        endDate = general.formatDate(new Date());
      }

      startDate = new Date(startDate);
      endDate = new Date(endDate);

      var params = {
        purchesedDate: {
          $gte: startDate,
          $lt: endDate,
        },
      };

      result = await SaleModel.quotation.getBestSellingProduct(params);
    } else {
      result = await SaleModel.quotation.getBestSellingProduct();
    }
    if (result.code == 1) {
      var resultProduct = result.data;
      var productModelCodeInArray = [];
      for (var i = 0; i < resultProduct.length; i++) {
        productModelCodeInArray = resultProduct[i].modelCode;
        await ProductModel.getProductModels(productModelCodeInArray);
        // ไปสร้าง Model ให้ get.find เฉยๆ แลว้เรียกใช้ตัว model ตรงนี้ โดยส่งค่า productModelCodeInArray ไป //
      }
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

const getTopBuyers = async (req, res) => {
  var result = new DataResponse();

  try {
    var { startDate, endDate } = req.query;
    if (typeof startDate !== "undefined" && typeof endDate !== "undefined") {
      if (typeof startDate === "undefined") {
        var beginDate = new Date();
        beginDate.setDate(1);
        startDate = general.formatDate(beginDate);
      }

      if (typeof endDate === "undefined") {
        endDate = general.formatDate(new Date());
      }

      startDate = new Date(startDate);
      endDate = new Date(endDate);

      var params = {
        purchesedDate: {
          $gte: startDate,
          $lt: endDate,
        },
      };

      result = await SaleModel.quotation.getTopBuyer(params);
    } else {
      result = await SaleModel.quotation.getTopBuyer();
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

const getBestSellingInCategory = async (req, res) => {
  var result = new DataResponse();

  try {
    var { startDate, endDate } = req.query;
    if (typeof startDate !== "undefined" && typeof endDate !== "undefined") {
      if (typeof startDate === "undefined") {
        var beginDate = new Date();
        beginDate.setDate(1);
        startDate = general.formatDate(beginDate);
      }

      if (typeof endDate === "undefined") {
        endDate = general.formatDate(new Date());
      }

      startDate = new Date(startDate);
      endDate = new Date(endDate);

      var params = {
        purchesedDate: {
          $gte: startDate,
          $lt: endDate,
        },
      };

      result = await SaleModel.quotation.getBestSellingCategory(params);
    } else {
      result = await SaleModel.quotation.getBestSellingCategory();
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
};

const getBestSellingInBrand = async (req, res) => {
  var result = new DataResponse();

  try {
    var { startDate, endDate } = req.query;
    if (typeof startDate !== "undefined" && typeof endDate !== "undefined") {
      if (typeof startDate === "undefined") {
        var beginDate = new Date();
        beginDate.setDate(1);
        startDate = general.formatDate(beginDate);
      }

      if (typeof endDate === "undefined") {
        endDate = general.formatDate(new Date());
      }

      startDate = new Date(startDate);
      endDate = new Date(endDate);

      var params = {
        purchesedDate: {
          $gte: startDate,
          $lt: endDate,
        },
      };

      result = await SaleModel.quotation.getBestSellingBrand(params);
    } else {
      result = await SaleModel.quotation.getBestSellingBrand();
    }
  } catch (e) {
    console.log(e);
  }
  res.json(result);
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
  updateDiscountGroup,
  getBestSellingInProduct,
  getTopBuyers,
  getBestSellingInCategory,
  getBestSellingInBrand,
};
