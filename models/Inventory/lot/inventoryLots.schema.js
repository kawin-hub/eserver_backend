const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryLots";

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
      default: "in progress",
    },
    documents: [
      {
        name: String,
        path: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
      // Documents for Purchase
    ],
    documentsFromStore: [
      {
        name: String,
        path: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
      // Documents for Store
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

module.exports = model(collection, inventoryLotSchema);
