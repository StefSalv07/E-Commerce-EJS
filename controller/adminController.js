// const adminModel = require("../model/adminModel");
// const bcrypt = require("bcryptjs");
// const otpGenerator = require("otp-generator");

// exports.AddAdmin = (req, res) => {
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(req.body.password, salt);
//   const adminObj = {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: hash,
//     role: req.body.role,
//     status: "active",
//   };
//   const admin = adminModel(adminObj);

//   admin
//     .save()
//     .then((data) => {
//       const token = generateToken.generateToken(data);
//       const obj = {
//         token: token,
//         user: data._id,
//         secret: "secret",
//         publicKey: generatePublicKey.generatePublicKey(16),
//       };
//       const tokenData = new authTokenModel(obj);
//       return tokenData.save();
//     })
//     .then((data) => {
//       res.status(201).json({
//         data: data,
//         msg: "Data Added Successfully..",
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error in Adding Admin",
//         error: err.message,
//       });
//     });
// };

// exports.getAllAdmin = (req, res) => {
//   adminModel
//     .find()
//     .populate("role")
//     .then((data) => {
//       res.status(200).json({
//         message: "Admin Retrieved successfully",
//         data: data,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error retrieving admins",
//         error: err.message,
//       });
//     });
// };

// exports.getAdminById = (req, res) => {
//   adminModel
//     .findById(req.params.id)
//     .populate("role")
//     .then((data) => {
//       if (data) {
//         res.status(200).json({
//           message: "Admin Retrieved successfully",
//           data: data,
//         });
//       } else {
//         res.status(404).json({
//           message: "Admin not found",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error retrieving admin",
//         error: err.message,
//       });
//     });
// };

// exports.deleteAdmin = (req, res) => {
//   adminModel
//     .findByIdAndDelete(req.params.id)
//     .then((data) => {
//       if (data) {
//         res.status(200).json({
//           message: "Admin Deleted successfully",
//           data: data,
//         });
//       } else {
//         res.status(404).json({
//           message: "Admin not found",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error deleting admin",
//         error: err.message,
//       });
//     });
// };

// exports.BlockAdmin = (req, res) => {
//   adminModel
//     .findByIdAndUpdate(req.params.id, { status: "blocked" }, { new: true })
//     .then((data) => {
//       if (data) {
//         res.status(200).json({
//           message: "Admin blocked successfully",
//         });
//       } else {
//         res.status(404).json({
//           message: "Admin not found",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error blocking admin",
//         error: err.message,
//       });
//     });
// };

// exports.UpdateAdmin = (req, res) => {
//   adminModel
//     .findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then((data) => {
//       if (data) {
//         res.status(200).json({
//           message: "Admin Updated successfully",
//           data: data,
//         });
//       } else {
//         res.status(404).json({
//           message: "Admin not found",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error updating admin",
//         error: err.message,
//       });
//     });
// };

// exports.LoginAdmin = (req, res) => {
//   adminModel
//     .findOne({ email: req.body.email })
//     .populate("role")
//     .then((data) => {
//       if (!data) {
//         return res.status(404).json({
//           message: "Invalid Credentials",
//         });
//       }

//       if (!bcrypt.compareSync(req.body.password, data.password)) {
//         return res.status(400).json({
//           message: "Invalid Credentials",
//         });
//       }

//       const refreshToken = generateToken.generateToken(data);
//       return authTokenModel.findOneAndUpdate(
//         { user: data._id },
//         { token: refreshToken },
//         { new: true }
//       );
//     })
//     .then((tokenData) => {
//       if (tokenData) {
//         res.status(200).json({
//           message: "Admin Login successfully",
//           token: tokenData.token,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error during login",
//         error: err.message,
//       });
//     });
// };

// exports.forgetPassword = (req, res) => {
//   adminModel
//     .findOne({ email: req.body.email })
//     .then((data) => {
//       if (!data) {
//         return res.status(404).json({
//           message: "Admin not found",
//         });
//       }

//       const otp = otpGenerator.generate(6, {
//         digits: true,
//         alphabets: false,
//         upperCase: false,
//         specialChars: false,
//       });

//       return adminModel.findOneAndUpdate(
//         { email: data.email },
//         { otp: otp },
//         { new: true }
//       );
//     })
//     .then((data) => {
//       mailer.sendOtp(data.email, data.otp);
//       res.status(200).json({
//         message: "OTP sent to your email",
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error in generating OTP",
//         error: err.message,
//       });
//     });
// };

// exports.ChangePassword = (req, res) => {
//   const { newPassword, confirmPassword, otp } = req.body;

//   if (newPassword !== confirmPassword) {
//     return res.status(400).json({
//       message: "Confirm Password Not Matched",
//     });
//   }

//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(newPassword, salt);

//   adminModel
//     .findOneAndUpdate({ otp: otp }, { password: hash }, { new: true })
//     .populate("role")
//     .then((data) => {
//       if (!data) {
//         return res.status(401).json({
//           message: "Entered OTP is Incorrect",
//         });
//       }

//       const token = generateToken.generateToken(data);
//       const obj = {
//         token: token,
//         user: data._id,
//         secret: "secret",
//         publicKey: generatePublicKey.generatePublicKey(16),
//       };
//       const tokenData = new authTokenModel(obj);
//       return tokenData.save();
//     })
//     .then((tokenData) => {
//       res.status(200).json({
//         message: "Password Reset Successfully",
//         token: tokenData.token,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error in resetting password",
//         error: err.message,
//       });
//     });
// };
