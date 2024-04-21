const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryProductSerial";

let inventoryProductSerailSchema = new Schema(
  {
    // ดึงข้อมูลของ Lot มาทั้งหมด
    lot_id: { type: ObjectId, ref: "inventoryLots" },
    // ดึงมาและเก็บไว้
    accountExpense: {
      expense_id: { type: ObjectId, ref: "AccountExpenses" },
      documentNumber: { type: String },
      category: { type: String },
      type: { type: String },
    },
    productModel: {
      productModel_id: { type: ObjectId, ref: "ProductModel" },
      modelCode: String,
      name: String,
    },
    inventoryLocation: {
      location_id: { type: ObjectId, ref: "inventoryLocations" },
      name: String,
    },
    // ข้อมูลที่ต้องเพิ่มตอน Recieve
    recieveDate: {
      type: Date,
      default: Date.now,
    },
    serialNumber: {
      type: String,
      unique: true,
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
    //สร้างและอัปเดตโดยใคร
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
