const { Schema, model, ObjectId } = require("mongoose");
const collection = "SaleLeads";

let saleQuotationSchema = new Schema(
    {
        doccumentNumber: {
            type: String,
            required: true,
            unique: true,
        },
        issuedDate: {
            type: Date,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
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
        lead: {
            _id: { type: ObjectId, ref: "SaleLeads" },
            leadFirstname: { type: String },
            leadLastname: { type: String },
            leadContactNumber: { type: String },
            companyName: { type: String },
            branch: { type: String },
            address: { type: String },
            taxId: { type: String },
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
    },
    {
        timestamps: true,
        versionKey: false,
        collection,
    }
);

module.exports = model(collection, saleQuotationSchema);
