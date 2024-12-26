const userModel = require("../model/userModel");
const cloudinary = require("cloudinary").v2;
const { generateToken } = require("../middlewares/jwtHelper");
const bcrypt = require("bcryptjs");
// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "dojftocet",
  api_key: process.env.API_KEY || 975438293562925,
  api_secret: process.env.API_SECRET || "zY6UBHRGgX65Yb5gk8AWzi-p5Gw",
});
// saving user to database
exports.registerUser = async (req, res) => {
  const file = req.files.profilePic;
  console.log("request body", req.body);
  const existingUser = await userModel.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  console.log("file from the request", file);
  const user = new userModel(req.body);
  await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    console.log("result", result.url);
    user.profilePic = result.url;
    console.log("profile Pic", user.profilePic);
  });

  await user
    .save()
    .then((data) => {
      if (!data || data == undefined) {
        return res.json({
          message: "User not saved",
          data: data,
          status: 400,
        });
      }
      res.json({
        message: "User saved",
        data: data,
        status: 201,
      });
      console.log("User Saved", data);
    })
    .catch((err) => {
      console.log("Error in saving user", err);
      res.json({
        message: "Error in saving user",
        error: err,
        status: 500,
      });
    });
};
exports.login = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return res.json({
      message: "User not found",
      status: 404,
      data: user,
    });
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials please try Again With Correct Credentails",
    });
  }
  const token = generateToken(user);
  res.json({
    message: "User logged in successfully",
    status: 200,
    token: token,
    data: user,
  });
};

exports.logout = async (req, res) => {};
exports.getUsers = async (req, res) => {};
exports.getUserById = async (req, res) => {};
exports.updateUser = async (req, res) => {};
exports.deleteUser = async (req, res) => {};
exports.forgotPassword = async (req, res) => {}; // forgot password
exports.resetPassword = async (req, res) => {}; // reset password
