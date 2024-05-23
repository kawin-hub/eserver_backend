const { Schema, model, ObjectId } = require("mongoose");
const collection = "SaleCustomerLevels";

let SaleCustomerLevelSchema = new Schema(
  {
    level: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

module.exports = model(collection, SaleCustomerLevelSchema);
