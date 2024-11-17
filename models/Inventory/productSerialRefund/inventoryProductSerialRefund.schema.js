const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryProductSerialRefund";
const { general } = require("../../../middleware");

let inventoryProductSerailRefundSchema = new Schema(
  {
    inventoryRefund: {
      refund_id: { type: ObjectId, ref: "InventoryRefunds" },
      documentNumber: { type: String },
    },

    inventoryRequest: {
      request_id: { type: ObjectId, ref: "InventoryRequests" },
      documentNumber: { type: String },
    },

    inventoryLocation: {
      location_id: { type: ObjectId, ref: "InventoryLocations" },
      name: { type: String },
    },

    productModel: {
      productModel_id: { type: ObjectId, ref: "ProductModel" },
      modelCode: String,
      name: String,
    },

    status: {
      type: String,
    },
    inventoryProductSerial: [
      {
        productSerial_id: { type: ObjectId, ref: "InventoryProductSerial" },
        serialNumber: { type: String },
      },
    ],
    /* currentStatus: {
        type: String,
      },
      movements: [
        {
          status: {
            type: String,
            enum: [
              "create lot",
              "in stock",
              "move",
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
            inventoryRequest: {
              request_id: { type: ObjectId, ref: "InventoryRequests" },
            },
          },
        },
      ], */
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

inventoryProductSerailRefundSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

inventoryProductSerailRefundSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryProductSerailRefundSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

inventoryProductSerailRefundSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, inventoryProductSerailRefundSchema);
