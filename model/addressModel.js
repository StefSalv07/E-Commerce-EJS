const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addressSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    statusId: {
      type: Schema.Types.ObjectId,
      ref: "statuses",
    },
    area: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    pincode: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("address", addressSchema);
