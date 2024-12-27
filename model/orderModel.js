const mongoose = require("mongoose");
const schema = mongoose.Schema;
const orderModel = new schema(
  {
    userId: {
      type: schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    cartId: {
      type: schema.Types.ObjectId,
      ref: "cart",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payment: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    isDelivered: {
      type: String,
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    addressId: [
      {
        type: schema.Types.ObjectId,
        ref: "address",
        required: true,
      },
    ],
    status: {
      type: schema.Types.ObjectId,
      ref: "status",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order", orderModel);
