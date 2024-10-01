const { Schema, model, ObjectId } = require("mongoose");
const { general } = require("../../middleware");
const collection = "ProductModel";

let productModelSchema = new Schema(
  {
    modelCode: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category_ids: [{ type: ObjectId, ref: "ProductCategories" }],
    brand_id: {
      type: ObjectId,
      ref: "ProductBrands",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "inactive",
    },
    price: {
      type: Number,
      default: 0,
    },
    discountGroup: [
      {
        customerLevel_id: { type: ObjectId, ref: "SaleCustomerLevels" },
        level: { type: String },
        discount: { type: Number, default: 0 },
      },
    ],
    installationPrice: {
      type: Number,
      default: 0,
    },
    subcontractorInstallationPrice: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
    },
    images: [
      {
        /* name: {
          type: String,
          enum: ["installation", "data-sheet", "announcement"],
        }, */
        name: String,
        path: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    documents: [
      {
        /* name: {
          type: String,
          enum: ["installation", "data-sheet", "announcement"],
        }, */
        name: String,
        path: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    relatedModels: [
      {
        type: ObjectId,
        ref: "ProductModel",
      },
    ],
    stock: {
      type: Boolean,
      default: false,
    },
    minimum: {
      type: Number,
      default: 0,
    },
    maximum: {
      type: Number,
      default: 0,
    },
    defaultWarranty: {
      amount: {
        type: Number,
        default: 1,
      },
      unit: {
        type: String,
        enum: ["y", "m"],
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection,
  }
);

productModelSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

productModelSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

productModelSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

productModelSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, productModelSchema);
