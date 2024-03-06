const { Schema, model, ObjectId } = require("mongoose");
const collection = "SaleLeads";

let saleLeadSchema = new Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        taxId: {
            type: String,
        },
        branch: {
            type: String,
        },
        address: {
            type: String,
        },
        googleMap: {
            type: String,
        },
        companyEmail: {
            type: String,
        },
        companyContactNumber: {
            type: String,
        },
        leadFirstname: {
            type: String,
            required: true,
        },
        leadLastname: {
            type: String,
        },
        leadContactNumber: {
            type: String,
            required: true,
        },
        lineId: {
            type: String,
        },
        leadLevel: {
            type: String,
            enum: ["low prudential", "middle prudential", "high prudential"],
            default: "low prudential",
        },
        tag: [
            {
                type: String,
            }
        ],
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
    },
    {
        timestamps: true,
        versionKey: false,
        collection,
    }
);

module.exports = model(collection, saleLeadSchema);
