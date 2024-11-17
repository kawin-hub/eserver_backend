const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryLots";
const { general } = require("../../../middleware");

let inventoryLotSchema = new Schema(
  {
    lotNumber: {
      type: String,
      required: true,
      unique: true,
    },
    estimatedDate: {
      type: Date,
      required: true,
    },
    accountExpense: {
      expense_id: { type: ObjectId, ref: "AccountExpenses" },
      documentNumber: { type: String },
      category: { type: String },
      type: { type: String },
    },

    inventoryLocation: {
      location_id: { type: ObjectId, ref: "inventoryLocations" },
      name: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "draft",
    },
    productModel: [
      {
        productModel_id: { type: ObjectId, ref: "ProductModel" },
        modelCode: { type: String },
        name: { type: String },
        quantity: { type: Number },
        warranty: { type: Number },
      },
    ],
    currentStatus: {
      type: String,
      enum: ["request", "done"],
      default: "request",
    },
    // Documents for Purchase
    documents: [
      {
        name: String,
        path: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // Documents from Store
    documentsFromStore: [
      {
        name: String,
        path: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
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

inventoryLotSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

inventoryLotSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryLotSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryLotSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, inventoryLotSchema);
