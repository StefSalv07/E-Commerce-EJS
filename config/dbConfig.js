const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const URL = process.env.MONGO_URL || "";
exports.dbConnection = async () => {
  await mongoose
    .connect(URL)
    .then((success) => {
      console.log(
        "!!!!!==========================Database connected==================================!!!!!"
      );
    })
    .catch((error) => {
      console.log("Error in connecting");
    });
};
