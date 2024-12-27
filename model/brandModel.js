const mongoose = require("mongoose");
const schema = mongoose.Schema;
const brandModel = new schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    status: {
      type: schema.Types.ObjectId,
      ref: "status", // reference to the status model
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("brand", brandModel);
