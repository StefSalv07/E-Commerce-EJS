const mongoose = require("mongoose");
const schema = mongoose.Schema;
const roleSchema = new schema(
  {
    roleName: {
      type: String,
      //   required: true,
    },
    roleDesc: {
      type: String,
    },
    status: {
      type: schema.Types.ObjectId,
      ref: "status",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("role", roleSchema);
