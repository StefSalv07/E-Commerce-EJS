const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const schema = mongoose.Schema;

const AdminSchema = new schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: schema.Types.ObjectId,
      ref: "role",
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

AdminSchema.pre("save", function (next) {
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

module.exports = mongoose.model("admin", AdminSchema);
