const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collection = "ProductCategories";

let productCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "inactive",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

module.exports = mongoose.model(collection, productCategorySchema);
