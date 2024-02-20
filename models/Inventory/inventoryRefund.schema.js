const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryRefunds";

let inventoryRefundSchema = new Schema(
    {
        documentNumber: {
            type: String,
            required: true,
            unique: true
        },

        InventoryMoves: {
            _id: { type: ObjectId, ref: "InventoryMoves" },
            documentNumber: { type: String }
        },

        products: [{
            _id: { type: ObjectId, ref: "ProductModel" },
            modelCode: String,
            name: String,
        }],
    },
    {
        timestamps: true,
        versionKey: false,
        collection,
    }
);

module.exports = model(collection, inventoryRefundSchema);
