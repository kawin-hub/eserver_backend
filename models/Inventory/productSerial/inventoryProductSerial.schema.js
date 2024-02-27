const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryProductSerial";

let inventoryProductSerailSchema = new Schema(
  {
    productModel: {
      _id: { type: ObjectId, ref: "ProductModel" },
      name: String,
      modelCode: String,
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
          inventoryLot: { _id: { type: ObjectId, ref: "inventoryLot" } },
          inventoryRequest: {
            _id: { type: ObjectId, ref: "inventoryRequest" },
          },
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

module.exports = model(collection, inventoryProductSerailSchema);
