const { Schema, model, ObjectId } = require("mongoose");
const collection = "InventoryMoves";

let inventoryMoveSchema = new Schema(
    {
        documentNumber: {
            type: String,
            required: true,
            unique: true
        },
        dueDate: {
            type: Date,
            required: true,
        },
        location: {
            origin: {
                _id: { type: ObjectId, ref: "InventoryLocations" },
                name: { type: String },
            },
            destination: {
                _id: { type: ObjectId, ref: "InventoryLocations" },
                name: { type: String },
            }
        },
        products: [
            {
              _id: { type: ObjectId, ref: "ProductModel" },
              modelCode: { type: String },
              name: { type: String },
              quantity: { type: Number },
            },
          ],
    },
    {
        timestamps: true,
        versionKey: false,
        collection,
    }
);

module.exports = model(collection, inventoryMoveSchema);
