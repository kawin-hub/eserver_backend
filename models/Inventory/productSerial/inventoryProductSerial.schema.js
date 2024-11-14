const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryProductSerial";
const { general } = require("../../../middleware");

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
    active: {
      type: Boolean,
      default: false,
    },
    movements: [
      {
        status: {
          type: String,
          enum: [
            "create lot",
            "in stock",
            "booked",
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
          type: Object,
          inventoryLot: { lot_id: { type: ObjectId, ref: "InventoryLots" } },
          inventoryRequest: {
            request_id: { type: ObjectId, ref: "InventoryRequests" },
          },
          quotation: {
            quotation_id: { type: ObjectId, ref: "SaleQuotations" },
          },
        },
        inventoryLocation: {
          location_id: { type: ObjectId, ref: "inventoryLocations" },
          name: String,
        },
        createdBy: {
          user_id: { type: ObjectId, ref: "Users" },
          firstname: { type: String },
          lastname: { type: String },
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

inventoryProductSerailSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

inventoryProductSerailSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryProductSerailSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryProductSerailSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, inventoryProductSerailSchema);
