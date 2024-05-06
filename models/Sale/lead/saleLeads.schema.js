const { Schema, model, ObjectId } = require("mongoose");
const { general } = require("../../../middleware");
const collection = "SaleLeads";

let saleLeadSchema = new Schema(
  {
    lineId: {
      type: String,
    },
    level: {
      type: String,
      enum: ["low prudential", "middle prudential", "high prudential"],
      default: "low prudential",
    },
    customerLevel: {
      customerLevel_id: { type: ObjectId, ref: "SaleCustomerLevels" },
      level: { type: String },
    },
    tag: [
      {
        type: String,
      },
    ],
    companyInfo: [
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
        firstname: {
          type: String,
          required: true,
        },
        lastname: {
          type: String,
        },
        contactNumber: {
          type: String,
          required: true,
        },
      },
    ],
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

saleLeadSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

saleLeadSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

saleLeadSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

saleLeadSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, saleLeadSchema);
