const mongoose = require("mongoose");
const schema = mongoose.Schema;
const productSchema = new schema(
  {
    categoryId: {
      type: schema.Types.ObjectId,
      ref: "category",
    },
    supplierId: {
      type: schema.Types.ObjectId,
      ref: "supplier",
    },
    description: {
      type: String,
    },
    brandId: {
      type: schema.Types.ObjectId,
      ref: "brands",
    },
    price: {
      type: Number,
    },
    ratings: {
      type: Number,
    },
    status: {
      type: schema.Types.ObjectId,
      ref: "status",
    },
    productImageId: {
      type: schema.Types.ObjectId,
      ref: "image",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productSchema);
