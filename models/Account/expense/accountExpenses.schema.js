const { Schema, model, ObjectId } = require("mongoose");
const { general } = require("../../../middleware");
const collection = "AccountExpenses";

let accountExpenseSchema = new Schema(
  {
    documentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    expenseDate: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      default: "others",
    },
    amount: {
      type: Number,
      default: 0,
      required: true,
    },
    whom: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
    remark: {
      type: String,
    },
    images: [
      {
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
        name: String,
        path: String,
        createdAt: {
          type: Date,
          default: Date.now,
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

accountExpenseSchema.pre("save", function (next) {
  var now = general.getDateTimeForDB();
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

accountExpenseSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

accountExpenseSchema.pre("updateOne", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

accountExpenseSchema.pre("updateMany", function (next) {
  this._update.updatedAt = general.getDateTimeForDB();
  next();
});

module.exports = model(collection, accountExpenseSchema);
