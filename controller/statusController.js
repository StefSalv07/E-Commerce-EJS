const statusmodel = require("../model/statusModel");
exports.addStatus = (req, res) => {
  // First check if a status with same name/type exists
  statusmodel
    .findOne({
      // Assuming status has a name or type field - adjust according to your schema
      $or: [{ name: req.body.name }, { type: req.body.type }],
    })
    .then((existingStatus) => {
      if (existingStatus) {
        res.status(400).json({
          message: "Status already exists",
          existingStatus: {
            id: existingStatus._id,
            name: existingStatus.name,
            type: existingStatus.type,
          },
        });
        throw new Error("STATUS_EXISTS");
      }

      // If no existing status found, create new status
      const statuses = new statusmodel(req.body);
      return statuses.save();
    })
    .then((data) => {
      if (data && !res.headersSent) {
        res.status(201).json({
          message: "Status Added Successfully",
          data: JSON.parse(JSON.stringify(data)), // Sanitize mongoose document
        });
      }
    })
    .catch((err) => {
      if (!res.headersSent) {
        console.error(err);
        // Don't send error response for our custom STATUS_EXISTS error
        if (err.message === "STATUS_EXISTS") {
          return;
        }
        res.status(500).json({
          message: "Error processing status request",
          error: err.message,
        });
      }
    });
};

exports.getAllStatuses = (req, res) => {
  statusmodel
    .find()
    .then((data) => {
      res.status(200).json({
        message: "Statuses Retrieved",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err.message,
      });
    });
};

exports.getStatusById = (req, res) => {
  statusmodel
    .findById(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Status retrieved successfully",
          data: data,
        });
      } else {
        res.status(404).json({
          message: "Status Not Found",
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

exports.deleteStatusById = (req, res) => {
  statusmodel
    .findById(req.params.id)
    .then((existingStatus) => {
      if (!existingStatus) {
        return res.status(404).json({
          message: "Status Not Found",
        });
      }
      return statusmodel.findByIdAndDelete(req.params.id);
    })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Status Deleted",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Status not deleted",
        error: err.message,
      });
    });
};

exports.deleteAllStatuses = (req, res) => {
  statusmodel
    .deleteMany()
    .then(() => {
      res.status(200).json({
        message: "All statuses deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to delete all statuses",
        error: err.message,
      });
    });
};

exports.updateStatusById = (req, res) => {
  statusmodel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Status Updated",
          data: data,
        });
      } else {
        res.status(404).json({
          message: "Status Not Found",
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
