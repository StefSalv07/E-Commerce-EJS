const express = require("express");
const router = express.Router();
const subCategoryController = require("../controller/subcategoryController");

router.post("/add-subcat", subCategoryController.addSubCategory);
router.put("/update-subcat/:id", subCategoryController.updateSubCategorybyId);
router.get("/get-subcat", subCategoryController.getAllSubCategories);
router.get("/get-subcat/:id", subCategoryController.getAllSubCategoriesById);
router.delete(
  "/delete-subcat/:id",
  subCategoryController.deleteSubCategoryById
);

module.exports = router;
