const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryTotals";

let inventoryTotalSchema = new Schema(
    {
        productModel: {
            _id: { type: ObjectId, ref: "ProductModel" },
            modelCode: { type: String },
            name: { type: String },
            status: { type: String },
        },
        inventoryLocation: {
          _id: { type: ObjectId, ref: "inventoryLocations" },
          name: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection,
    }
);

module.exports = model(collection, inventoryTotalSchema);
