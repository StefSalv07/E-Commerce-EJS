const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");

router.post("/add-category", categoryController.addCategory);
router.put("/update-category/:id", categoryController.updateCategorybyId);
router.get("/get-category", categoryController.getAllCategories);
router.get("/get-category/:id", categoryController.getCategoryById);
router.delete("/delete-categeory/:id", categoryController.deleteCategoryById);

module.exports = router;
