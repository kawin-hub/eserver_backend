const { Schema, model, ObjectId } = require("mongoose");
const collection = "SaleLeads";

let saleLeadSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    taxId: {
      type: String,
    },
    branch: {
      type: String,
    },
    address: {
      type: String,
    },
    googleMap: {
      type: String,
    },
    companyEmail: {
      type: String,
    },
    companyContactNumber: {
      type: String,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    lineId: {
      type: String,
    },
    level: {
      type: String,
      enum: ["low prudential", "middle prudential", "high prudential"],
      default: "low prudential",
    },
    saleCustomerLevel: {
      customerLevel_id: { type: ObjectId, ref: "SaleCustomerLevels" },
      level: { type: String },
    },
    tag: [
      {
        type: String,
      },
    ],
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

module.exports = model(collection, saleLeadSchema);
