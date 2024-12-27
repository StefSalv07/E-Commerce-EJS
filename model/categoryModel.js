const mongoose = require("mongoose");
const schema = mongoose.Schema;
const categorySchema = new schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    statusId: {
      type: schema.Types.ObjectId,
      ref: "status",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("category", categorySchema);
