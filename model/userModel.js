const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const schema = mongoose.Schema;
const userSchema = new schema(
  {
    roleId: {
      type: schema.Types.ObjectId,
      ref: "role",
    },
    userName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// encrypting the password before saving the document
userSchema.pre("save", function (next) {
  // If the password is not modified, skip hashing
  if (!this.isModified("password")) {
    return next(); // If password is not modified, move to the next middleware
  }

  // Hash the password using bcrypt
  bcrypt
    .genSalt(10) // Generate salt
    .then((salt) => {
      return bcrypt.hash(this.password, salt); // Hash the password
    })
    .then((hashedPassword) => {
      this.password = hashedPassword; // Set the hashed password to the document
      console.log("Hashed Password: ", this.password);
      next(); // Proceed to save the document
    })
    .catch((error) => {
      next(error); // Pass any error to the next middleware
    });
});
module.exports = mongoose.model("user", userSchema);
