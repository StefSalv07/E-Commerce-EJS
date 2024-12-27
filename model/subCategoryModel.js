const mongoose = require("mongoose");
const schema = mongoose.Schema;
const subCategorySchema = new schema(
  {
    categoryId: {
      type: schema.Types.ObjectId,
      ref: "category",
    },
    status: {
      type: schema.Types.ObjectId,
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
