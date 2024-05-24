const mongoose = require("mongoose");
const { general } = require("../../middleware");
const Schema = mongoose.Schema;
const collection = "ProductBrands";

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

module.exports = mongoose.model(collection, productBrandsSchema);
