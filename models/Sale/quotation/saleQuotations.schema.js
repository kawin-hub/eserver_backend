const { Schema, model, ObjectId } = require("mongoose");
const collection = "SaleQuotations";

let saleQuotationSchema = new Schema(
  {
    documentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    issuedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    customerInfo: {
      lead_id: { type: ObjectId, ref: "SaleLeads" },
      firstname: { type: String },
      lastname: { type: String },
      contactNumber: { type: String },
      companyName: { type: String },
      branch: { type: String },
      address: { type: String },
      taxId: { type: String },
      lineId: { type: String },
    },
    products: [
      {
        productModel_id: { type: ObjectId, ref: "ProductModel" },
        modelCode: { type: String },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        discountPercent: { type: Number },
        discountBaht: { type: Number },
      },
    ],
    summary: {
      extraDiscount: {
        type: Number,
        required: true,
      },
      totalDiscount: {
        type: Number,
        required: true,
      },
      vat: {
        type: Number,
        default: 7,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
    },
    note: {
      type: String,
    },
    quotationStatus: {
      type: String,
      enum: ["draft", "warm", "hot", "cold", "done"],
      default: "draft",
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
    currentStatus: {
      type: String,
      default: "not yet purchased",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

module.exports = model(collection, saleQuotationSchema);
