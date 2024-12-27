const mongoose = require("mongoose");
const schema = mongoose.Schema;
const cartSchema = new schema(
  {
    userId: {
      type: schema.Types.ObjectId,
      ref: "user",
    },
    subCategoryId: {
      type: schema.Types.ObjectId,
      ref: "subcategory",
    },
    products: [
      {
        type: schema.Types.ObjectId,
        ref: "product",
      },
    ],
    statusId: {
      type: schema.Types.ObjectId,
      ref: "statuses",
    },
    qty: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("cart", cartSchema);
