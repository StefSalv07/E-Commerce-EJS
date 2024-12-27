const mongoose = require("mongoose");
const schema = mongoose.Schema;
const errorMessages = require("../constants/errorMessages");
const STATUS = require("../constants/status");
const productSchema = new schema(
  {
    productName: {
      type: String,
    },
    productDesc: {
      type: String,
    },
    price: {
      type: Number,
    },
    ratings: {
      type: Number,
    },
    categoryId: {
      type: schema.Types.ObjectId,
      ref: "category",
    },
    brandId: {
      type: schema.Types.ObjectId,
      ref: "brands",
    },
    userId: {
      type: schema.Types.ObjectId,
      ref: "user",
    },
    productImage: {
      type: "String",
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
    discountPrice: {
      type: Number,
    },
    variants: [
      {
        color: String,
        size: String,
        additionalPrice: Number,
        stockQuantity: Number,
      },
    ],
    reviews: [
      {
        userId: {
          type: schema.Types.ObjectId,
          ref: "user",
        },
        review: String,
        ratings: Number,
      },
    ],
    status: {
      type: String,
      default: STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productSchema);
