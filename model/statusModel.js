const mongoose = require("mongoose");
const schema = mongoose.Schema;
const statusSchema = new schema(
  {
    statusName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("status", statusSchema);
