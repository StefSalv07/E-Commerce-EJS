const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addressSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: "status",
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
