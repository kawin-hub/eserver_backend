const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryRefunds";
const { general } = require("../../../middleware");

let inventoryRefundSchema = new Schema(
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

    productModel: [
      {
        productModel_id: { type: ObjectId, ref: "ProductModel" },
        modelCode: { type: String },
        name: { type: String },
        quantity: { type: Number },
      },
    ],

    inventoryRequest: {
      request_id: { type: ObjectId, ref: "InventoryRequests" },
      documentNumber: { type: String },
    },

    inventoryLocation: {
      location_id: { type: ObjectId, ref: "inventoryLocations" },
      name: String,
    },

    status: {
      type: String,
      enum: ["request", "done"],
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

inventoryRefundSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

inventoryRefundSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryRefundSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryRefundSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, inventoryRefundSchema);
