const categorySchema = require("../model/categoryModel");

exports.addCategory = (req, res) => {
  const categories = new categorySchema(req.body);
  categories
    .save()
    .then((data) => {
      res.status(201).json({
        message: "Category Added",
        data: data,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error adding category",
        error: err.message,
      });
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
