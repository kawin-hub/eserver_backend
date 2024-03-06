const { Schema, model, ObjectId } = require("mongoose");
const collection = "Invoices";

let invoiceSchema = new Schema(
  {
    // ข้อมูลที่ต้องเพิ่มใน Invoice
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
    amountRecieved: {
      percent: {
        type: Number,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
    },
    customerType: {
      type: String,
      enum: ["project", "dealer", "general"],
      default: "general",
      required: true,
    },
    projectType: {
      type: String,
      enum: ["install", "delivery"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    // ข้อมูลที่ดึงมาจากแหล่งอื่นตอน Convert จะอยู่ในหน้า Invoice
    saleQuotation: {
      _id: { type: ObjectId, ref: "saleQuotations" },
    },
    customerInfo: {
      _id: { type: ObjectId, ref: "SaleLeads" },
      leadFirstname: { type: String },
      leadLastname: { type: String },
      leadContactNumber: { type: String },
      companyName: { type: String },
      branch: { type: String },
      address: { type: String },
      taxId: { type: String },
      googleMap: { type: String },
    },
    products: [
      {
        _id: { type: ObjectId, ref: "ProductModel" },
        modelCode: { type: String },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        discountPercent: { type: Number },
        discountBaht: { type: Number },
      },
    ],
    createdBy: {
      _id: { type: ObjectId, ref: "Users" },
      firstname: { type: String },
      lastname: { type: String },
    },
    updatedBy: {
      _id: { type: ObjectId, ref: "Users" },
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

module.exports = model(collection, invoiceSchema);
