const categorySchema = require("../model/categoryModel");

exports.addCategory = (req, res) => {
  const { categoryName } = req.body;

  // Check if the category already exists
  categorySchema
    .findOne({ categoryName })
    .then((existingCategory) => {
      if (existingCategory) {
        // Ensure only one response is sent
        res.status(200).json({
          message: "Category already exists",
          data: existingCategory,
        });
        return null; // Exit further promise chaining
      }

      // If category doesn't exist, create a new one
      const categories = new categorySchema(req.body);
      return categories.save();
    })
    .then((savedCategory) => {
      if (savedCategory) {
        res.status(201).json({
          message: "Category Added",
          data: savedCategory,
        });
      }
    })
    .catch((err) => {
      // Handle errors centrally
      console.error(err);
      if (!res.headersSent) {
        // Prevent duplicate response
        res.status(500).json({
          message: "Error processing request",
          error: err.message,
        });
      }
    });
};

exports.getAllCategories = (req, res) => {
  categorySchema
    .find()
    .then((data) => {
      res.status(200).json({
        message: "Data Retrieved",
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

exports.deleteCategoryById = (req, res) => {
  categorySchema
    .findById(req.params.id)
    .then((existingCategory) => {
      if (!existingCategory) {
        return res.status(404).json({
          message: "Category Not Found",
        });
      }
      return categorySchema.findByIdAndDelete(req.params.id);
    })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Category Deleted",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Category not deleted",
        error: err.message,
      });
    });
};

exports.updateCategorybyId = (req, res) => {
  categorySchema
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Category Updated",
          data: data,
        });
      } else {
        res.status(404).json({
          message: "Category Not Found",
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

exports.getCategoryById = (req, res) => {
  categorySchema
    .findById(req.params.id)
    .then((data) => {
      if (data) {
        res.status(200).json({
          message: "Category retrieved successfully",
          data: data,
        });
      } else {
        res.status(404).json({
          message: "Category Not Found",
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
