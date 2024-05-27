const { Schema, model, ObjectId } = require("mongoose");
const { general } = require("../../../middleware");
const collection = "SaleReceipts";

let saleReceiptSchema = new Schema(
  {
    // ข้อมูลที่ต้องเพิ่มใน Invoice
    documentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    quotation_id: { type: ObjectId, ref: "SaleQuotations", required: true },
    invoice: {
      invoice_id: {
        type: ObjectId,
        ref: "SaleInvoices",
        required: true,
        unique: true,
      },
      documentNumber: String,
    },
    customerLevel: {
      customerLevel_id: { type: ObjectId, ref: "SaleCustomerLevels" },
      level: { type: String },
    },
    customerInfo: {
      lead_id: { type: ObjectId, ref: "SaleLeads" },
      lineId: { type: String },
      taxId: { type: String },
      address: { type: String },
      name: { type: String },
      contactNumber: { type: String },
    },
    detail: {
      type: String,
    },
    amountRecieved: {
      percent: {
        type: Number,
      },
      baht: {
        type: Number,
        required: true,
      },
    },
    vat: {
      type: Number,
      default: 7,
    },
    note: {
      type: String,
    },
    pdfPath: {
      type: String,
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
    paidDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

saleReceiptSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

saleReceiptSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

saleReceiptSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

saleReceiptSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, saleReceiptSchema);
