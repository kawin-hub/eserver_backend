const { Schema, model, ObjectId } = require("mongoose");
const collection = "SaleQuotations";

let saleQuotationSchema = new Schema(
    {
        documentNumber: {
            type: String,
            required: true,
            unique: true,
        },
        issuedDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        dueDate: {
            type: Date,
            required: true,
        },
        saleLead: {
            _id: { type: ObjectId, ref: "SaleLeads" },
            leadFirstname: { type: String },
            leadLastname: { type: String },
            leadContactNumber: { type: String },
            companyName: { type: String },
            branch: { type: String },
            address: { type: String },
            taxId: { type: String },
            lineId: { type: String },
        },
        products: [
            {
                _id: { type: ObjectId, ref: "ProductModel" },
                modelCode: { type: String },
                name: { type: String },
                price: { type: Number },
                quantity: { type: Number },
            },
        ],
        salesperson: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
        },
        note: {
            type: String,
        },
        quotationStatus: {
            type: String,
            enum: ["warm", "hot", "cold", "done"],
            default: "warm",
        },
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
        currentStatus: {
            type: String,
            default: "not yet purchased"
        },
    },
    {
        timestamps: true,
        versionKey: false,
        collection,
    }
);

module.exports = model(collection, saleQuotationSchema);
