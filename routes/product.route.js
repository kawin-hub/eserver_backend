const express = require("express");
const router = express.Router();
const { verifyToken } = (mw = require("../middleware/"));
const multer = require("multer");
const upload = multer({ dest: "./assets/images/product/brands/" });

const {
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
} = require("../controllers/product.controller");

// ProductCategories
router.post("/categories", verifyToken, insertProductCategory);
router.get("/categories", verifyToken, getAllProductCategories);
router.put("/categories", verifyToken, updateProductCategory);
router.delete("/categories", verifyToken, deleteProductCategory);

// ProductBrand
router.get("/brands", verifyToken, getProductBrands);
router.post("/brands", verifyToken, insertProductBrand);
router.delete("/brands", verifyToken, deleteProductBrand);
router.put("/brands", verifyToken, updateProductBrand);

// ProductModel
router.post("/models", verifyToken, insertProductModel);
router.get("/models", verifyToken, getProductModels);
router.put("/models", verifyToken, updateProductModel);
router.delete("/models", verifyToken, deleteProductModel);

module.exports = router;
