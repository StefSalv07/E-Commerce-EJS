const addressSchema = require("../model/addressModel");

exports.addAddress = (req, res) => {
  // First check if an address already exists for this userId
  addressSchema
    .findOne({ userId: req.body.userId })
    .then((existingAddress) => {
      if (existingAddress) {
        // Return early if address exists
        res.status(400).json({
          message:
            "An address is already registered with this userId. Please contact admin to add additional addresses.",
        });
        // Throw an error to skip the next then block
        throw new Error("ADDRESS_EXISTS");
      }

      // If no existing address found, create new address
      const address = new addressSchema(req.body);
      return address.save();
    })
    .then((data) => {
      // Only execute if no error was thrown
      if (data && !res.headersSent) {
        res.status(201).json({
          message: "Address Added",
          data: JSON.parse(JSON.stringify(data)), // Sanitize the mongoose document
        });
      }
    })
    .catch((err) => {
      // Only send error response if no response has been sent yet
      if (!res.headersSent) {
        console.log(err);
        // Don't send error response for our custom ADDRESS_EXISTS error
        if (err.message === "ADDRESS_EXISTS") {
          return;
        }
        res.status(500).json({
          message: "Error processing address request",
          error: err.message,
        });
      }
    });
};
exports.getAllAddress = (req, res) => {
  addressSchema
    .find()
    .then((data) => {
      res.status(200).json({
        message: "data Retrieved",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something Went Wrong",
        error: err.message,
      });
    });
};

exports.deleteAddressById = (req, res) => {
  console.log(req.params.id);
  addressSchema
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "address Deleted",
        });
      } else {
        res.status(404).json({
          message: "address Not Found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error deleting address",
        error: err.message,
      });
    });
};

exports.deleteAllAddresses = (req, res) => {
  addressSchema
    .deleteMany({})
    .then((result) => {
      res.status(200).json({
        message: "All addresses deleted",
        deletedCount: result.deletedCount,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting all addresses",
        error: err.message,
      });
    });
};

exports.updateAddressbyId = (req, res) => {
  addressSchema
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "address Updated",
          data: data,
        });
      } else {
        res.status(404).json({
          message: "address Not Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.message,
      });
    });
};

exports.getAddressById = (req, res) => {
  addressSchema
    .findById(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Address retrieved successfully",
          data: data,
        });
      } else {
        res.status(404).json({
          message: "Address Not Found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving address",
        error: err.message,
      });
    });
};
