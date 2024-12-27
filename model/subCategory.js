const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subCategorySchema = Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    statusId: {
      type: Schema.Types.ObjectId,
      ref: "status",
    },
    subCategoryName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("subcategory", subCategorySchema);
