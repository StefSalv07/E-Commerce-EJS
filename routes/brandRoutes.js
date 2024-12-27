const express = require("express");
const router = express.Router();
const brandController = require("../controller/brandController");
// const tokenMiddleware = require("../../middleware/TokenMiddleWare");
// const validate = require("../../middleware/ZodMiddleWare");
// const brandValidation = require("../../util/shared/brandValidationUtil");

router.post("/add-brand", brandController.createBrand);
router.get("/get-brand", brandController.getAllBrands);
router.get("/get-brand/:id", brandController.getBrandById);
router.delete("/delete-brand/:id", brandController.deleteBrand);
router.put("/update-brand/:id", brandController.updateBrand);

module.exports = router;
