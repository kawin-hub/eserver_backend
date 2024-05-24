const { Schema, model, ObjectId } = require("mongoose");
const { general } = require("../../../middleware");
const collection = "SaleCertificate";

let SaleCertificateSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
      unique: true,
    },
    /*   lead_id: { type: ObjectId, ref: "SaleLeads" },
    quotation_id: { type: ObjectId, ref: "SaleQuotations" }, */
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
    warrantyPreriod: {
      from: Date,
      to: Date,
    },
    detail: {
      type: String,
    },
    warrantyStatus: {
      type: String,
      enum: ["warranty", "nonWarranty"],
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

SaleCertificateSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

SaleCertificateSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

SaleCertificateSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

SaleCertificateSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, SaleCertificateSchema);
