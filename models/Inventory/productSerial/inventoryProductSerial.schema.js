const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryProductSerial";

let inventoryProductSerailSchema = new Schema(
  {
    productModel: {
      productModel_id: { type: ObjectId, ref: "ProductModel" },
      modelCode: String,
      name: String,
    },
    inventoryLocation: {
      location_id: { type: ObjectId, ref: "inventoryLocations" },
      name: String,
    },
    inventoryLot: {
      lot_id: { type: ObjectId, ref: "inventoryLots" },
      lotNumber: String,
    },
    accountExpense: {
      expense_id: { type: ObjectId, ref: "AccountExpenses" },
      documentNumber: { type: String },
      category: { type: String },
      type: { type: String },
    },
    serialNumber: {
      type: String,
      unique: true,
    },
    recieveDate: {
      type: Date,
      default: Date.now,
    },
    currentStatus: {
      type: String,
      default: "in stock",
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
          inventoryLot: { lot_id: { type: ObjectId, ref: "InventoryLots" } },
          inventoryRequest: {
            request_id: { type: ObjectId, ref: "InventoryRequests" },
          },
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

module.exports = model(collection, inventoryProductSerailSchema);
