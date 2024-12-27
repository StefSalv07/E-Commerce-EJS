const statusmodel = require("../model/statusModel");
exports.addStatus = (req, res) => {
  const statuses = new statusmodel(req.body);
  statuses
    .save()
    .then((data) => {
      res.status(201).json({
        message: "Status Added",
        data: data,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error adding status",
        error: err.message,
      });
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
