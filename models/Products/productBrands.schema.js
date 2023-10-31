const mongoose = require("mongoose");
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

module.exports = mongoose.model(collection, productBrandsSchema);
