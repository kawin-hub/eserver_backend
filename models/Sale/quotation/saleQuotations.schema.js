const { Schema, model, ObjectId } = require("mongoose");
const { general } = require("../../../middleware");
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
      lineId: { type: String },
      companyInfo: {
        companyInfo_id: { type: ObjectId, ref: "SaleLeads" },
        companyName: { type: String },
        taxId: { type: String },
        branch: { type: String },
        address: { type: String },
        googleMap: { type: String },
        companyEmail: { type: String },
        companyContactNumber: { type: String },
        firstname: { type: String },
        lastname: { type: String },
        contactNumber: { type: String },
      },
    },
    customerLevel: {
      customerLevel_id: { type: ObjectId, ref: "SaleCustomerLevels" },
      level: { type: String },
    },
    products: [
      {
        productModel_id: { type: ObjectId, ref: "ProductModel" },
        modelCode: { type: String },
        name: { type: String },
        description: { type: String },
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
    pdfPath: {
      type: String,
    },
    documentName: {
      type: String,
      default: "เอกสาร",
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
      enum: ["purchased", "not yet purchased"],
      default: "not yet purchased",
    },
    purchesedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

saleQuotationSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

saleQuotationSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

saleQuotationSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

saleQuotationSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, saleQuotationSchema);
