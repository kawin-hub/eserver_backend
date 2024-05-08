const { Schema, model, ObjectId } = require("mongoose");
const collection = "SaleCertificate";

let SaleCertificateSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
      unique: true,
    },
    lead_id: { type: ObjectId, ref: "SaleLeads" },
    datePurcharse: {
      type: Date,
      required: true,
    },
    productService: {
      type: String,
    },
    quotationNumber: {
      type: String,
      required: true,
    },
    quotation_id: { type: ObjectId, ref: "SaleQuotations" },
    warrantyPreriod: {
      from: Date,
      to: Date,
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

module.exports = model(collection, SaleCertificateSchema);
