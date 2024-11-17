const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryProductSerialMove";
const { general } = require("../../../middleware");

let inventoryProductSerailMoveSchema = new Schema(
  {
    // ดึงข้อมูลของ Move มาทั้งหมด
    move_id: { type: ObjectId, ref: "InventoryMoves" },
    // ดึงมาและเก็บไว้
    inventoryMove: {
      move_id: { type: ObjectId, ref: "InventoryMoves" },
      documentNumber: { type: String },
      dueDate: { type: Date },
    },
    inventoryLocation: {
      origin: {
        location_id: { type: ObjectId, ref: "InventoryLocations" },
        name: { type: String },
      },
      destination: {
        location_id: { type: ObjectId, ref: "InventoryLocations" },
        name: { type: String },
      },
    },
    productModel: {
      productModel_id: { type: ObjectId, ref: "ProductModel" },
      modelCode: String,
      name: String,
    },
    inventoryProductSerial: [
      {
        productSerial_id: { type: ObjectId, ref: "InventoryProductSerial" },
        serialNumber: { type: String },
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

inventoryProductSerailMoveSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

inventoryProductSerailMoveSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryProductSerailMoveSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryProductSerailMoveSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, inventoryProductSerailMoveSchema);
