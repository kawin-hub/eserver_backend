const mongoose = require("mongoose");
const { general } = require("../../middleware");
const Schema = mongoose.Schema;
const collection = "ProductBrands";

const ProductModel = require("../Products");

let productBrandsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
    },
    avatar: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "inactive",
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);
productBrandsSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

productBrandsSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

productBrandsSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

productBrandsSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

productBrandsSchema.pre("remove", async function (next) {
  console.log(1);
  try {
    const relatedDocs = await ProductModel.find({ brand_id: this._id });
    if (relatedDocs.length > 0) {
      // If related documents are found, prevent deletion
      const error = new Error(
        "Cannot delete document: related documents exist."
      );
      next(error);
    } else {
      console.log("In pre remove");
      // Proceed with deletion if no related documents are found
      next();
    }
  } catch (e) {
    next(e);
  }
});

productBrandsSchema.pre("findByIdAndDelete", async function (next) {
  console.log(123);
  next();
  /* try {
    const relatedDocs = await ProductModel.find({ brand_id: this._id });
    if (relatedDocs.length > 0) {
      // If related documents are found, prevent deletion
      const error = new Error(
        "Cannot delete document: related documents exist."
      );
      next(error);
    } else {
      console.log("In pre findByIdAndDelete");
      // Proceed with deletion if no related documents are found
      next();
    }
  } catch (e) {
    next(e);
  } */
});

module.exports = mongoose.model(collection, productBrandsSchema);
