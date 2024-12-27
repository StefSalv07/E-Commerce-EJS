const subCategorySchema = require("../model/subCategoryModel");

// Add a subcategory with a duplicate check
exports.addSubCategory = (req, res) => {
  const { subCategoryName } = req.body;

  // Check for existing subcategory
  subCategorySchema
    .findOne({ subCategoryName })
    .then((existingSubCategory) => {
      if (existingSubCategory) {
        res.status(200).json({
          message: "SubCategory already exists",
          data: existingSubCategory,
        });
        return null; // Exit the chain to avoid further execution
      }

      // Create and save the new subcategory
      const subCategories = new subCategorySchema(req.body);
      return subCategories.save();
    })
    .then((savedSubCategory) => {
      if (savedSubCategory) {
        res.status(201).json({
          message: "SubCategory Added",
          data: savedSubCategory,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      if (!res.headersSent) {
        // Ensure headers are not sent before sending a response
        res.status(500).json({
          message: "Error adding subcategory",
          error: err.message,
        });
      }
    });
};

// Retrieve all subcategories
exports.getAllSubCategories = (req, res) => {
  subCategorySchema
    .find()
    .then((data) => {
      res.status(200).json({
        message: "Data retrieved successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving data",
        error: err.message,
      });
    });
};

// Delete a subcategory by ID
exports.deleteSubCategoryById = (req, res) => {
  subCategorySchema
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "SubCategory Deleted",
        });
      } else {
        res.status(404).json({
          message: "SubCategory Not Found",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error deleting subcategory",
        error: err.message,
      });
    });
};

// Update a subcategory by ID
exports.updateSubCategorybyId = (req, res) => {
  subCategorySchema
    .findByIdAndUpdate(req.params.id, req.body, { new: true }) // Return the updated document
    .then((updatedData) => {
      if (updatedData) {
        res.status(200).json({
          message: "SubCategory Updated",
          data: updatedData,
        });
      } else {
        res.status(404).json({
          message: "SubCategory Not Found",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error updating subcategory",
        error: err.message,
      });
    });
};

// Retrieve a subcategory by ID
exports.getAllSubCategoriesById = (req, res) => {
  subCategorySchema
    .findById(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "SubCategory retrieved successfully",
          data: data,
        });
      } else {
        res.status(404).json({
          message: "SubCategory Not Found",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving subcategory",
        error: err.message,
      });
    });
};
