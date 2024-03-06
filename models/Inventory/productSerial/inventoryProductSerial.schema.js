const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryProductSerial";

let inventoryProductSerailSchema = new Schema(
  {
    productModel: {
      _id: { type: ObjectId, ref: "ProductModel" },
      modelCode: String,
      name: String,
    },
    inventoryLocation: {
      _id: { type: ObjectId, ref: "inventoryLocations" },
      name: String,
    },
    inventoryLot: {
      _id: { type: ObjectId, ref: "inventoryLots" },
      lotNumber: String,
    },
    accountExpense: {
      _id: { type: ObjectId, ref: "AccountExpenses" },
      documentNumber: { type: String },
      expenseCategory: { type: String },
      expenseType: { type: String },
    },
    serialNumber: {
      type: String,
      unique: true
    },
    recieveDate: {
      type: Date,
      default: Date.now,
    },
    currentStatus: {
      type: String,
      default: "in stock"
    },
    movements: [
      {
        status: {
          type: String,
          enum: [
            "create lot",
            "in stock",
            "borrowed",
            "sold",
            "broken",
            "r&d",
            "gift",
            "others",
          ],
          //required: true,
        },
        movementDateTime: {
          type: Date,
          default: Date.now,
        },
        docNumber: {
          type: String,
          inventoryLot: { _id: { type: ObjectId, ref: "InventoryLots" } },
          inventoryRequest: {
            _id: { type: ObjectId, ref: "InventoryRequests" },
          },
        },
      },
    ],
    createdBy: {
      _id: { type: ObjectId, ref: "Users" },
      firstname: { type: String },
      lastname: { type: String }
    },
    updatedBy: {
      _id: { type: ObjectId, ref: "Users" },
      firstname: { type: String },
      lastname: { type: String }
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

module.exports = model(collection, inventoryProductSerailSchema);
