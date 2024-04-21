const { Schema, model, ObjectId } = require("mongoose");
const collection = "SaleCustomerLevels";

let SaleCustomerLevelSchema = new Schema(
  {
    level: {
      type: String,
      unique: true,
    },
    createdBy: {
      user_id: { type: ObjectId, ref: "Users" },
      firstname: { type: String },
      lastname: { type: String },
    },
    updatedBy: {
      user_id: { type: ObjectId, ref: "Users" },
      firstname: { type: String },
      lastname: { type: String },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

module.exports = model(collection, SaleCustomerLevelSchema);
