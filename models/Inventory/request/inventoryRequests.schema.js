const { type } = require("express/lib/response");
const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryRequests";
const { general } = require("../../../middleware");

let inventoryRequestSchema = new Schema(
  {
    documentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    requestType: {
      type: String,
      enum: ["sell", "booking", "borrow", "broken", "r&d", "gift", "others"],
      required: true,
    },
    quotation: {
      quotation_id: { type: ObjectId, ref: "SaleQuotations" },
    },
    estimatedReturnDate: {
      type: Date,
    },
    remark: {
      type: String,
    },
    productModel: [
      {
        productModel_id: { type: ObjectId, ref: "ProductModel" },
        modelCode: { type: String },
        name: { type: String },
        quantity: { type: Number },
      },
    ],
    currentStatus: {
      type: String,
      default: "request",
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

inventoryRequestSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

inventoryRequestSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryRequestSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryRequestSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, inventoryRequestSchema);
