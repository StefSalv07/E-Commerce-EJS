const express = require("express");
const router = express.Router();

router.post("/outfit", validate(outfitValidation), outfitController.addOutfit);
router.put("/outfit/:id", outfitController.updateOutfitbyId);
router.get("/outfit", outfitController.getAllOutfits);
router.get("/outfit/:id", outfitController.getOutfitById);
router.delete("/outfit/:id", outfitController.deleteOutfitById);

module.exports = router;
