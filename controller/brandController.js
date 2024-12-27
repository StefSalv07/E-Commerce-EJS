const brandModel = require("../model/brandModel");

// Create a new brand with a check for existing brand
exports.createBrand = (req, res) => {
  const { brandName } = req.body;
  brandModel
    .findOne({ brandName: { $regex: new RegExp(`^${brandName}$`, "i") } })
    .then((existingBrand) => {
      if (existingBrand) {
        throw {
          status: 400,
          message: "Brand already exists",
          data: existingBrand,
        };
      }
      const brand = new brandModel(req.body);
      return brand.save();
    })
    .then((savedBrand) => {
      res.status(201).json({
        message: "Brand created successfully",
        data: savedBrand,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(err.status || 500).json({
        message: err.message || "Error creating brand",
        data: err.data,
        error: err.error,
      });
    });
};
// Get all brands
exports.getAllBrands = (req, res) => {
  brandModel
    .find()
    .then((data) => {
      res.status(200).json({
        message: "Brands retrieved successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving brands",
        error: err.message,
      });
    });
};

// Get brand by ID
exports.getBrandById = (req, res) => {
  brandModel
    .findById(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Brand retrieved successfully",
          data: data,
        });
      } else {
        res.status(404).json({
          message: "Brand not found",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving brand",
        error: err.message,
      });
    });
};

// Update brand
exports.updateBrand = (req, res) => {
  brandModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true }) // Return the updated document
    .then((updatedBrand) => {
      if (updatedBrand) {
        res.status(200).json({
          message: "Brand updated successfully",
          data: updatedBrand,
        });
      } else {
        res.status(404).json({
          message: "Brand not found",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error updating brand",
        error: err.message,
      });
    });
};

// Delete brand by ID
exports.deleteBrand = (req, res) => {
  brandModel
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Brand deleted successfully",
          data: data,
        });
      } else {
        res.status(404).json({
          message: "Brand not found",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error deleting brand",
        error: err.message,
      });
    });
};
