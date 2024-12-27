const express = require("express");
const router = express.Router();
const cartController = require("");

router.post("/cart", validate(cartValidation), cartController.addCart);
router.put("/cart/:id", cartController.updateCartbyId);
router.get("/cart", cartController.getAllCarts);
router.get("/cart/:id", cartController.getCartById);
router.delete("/cart/:id", cartController.deleteCartById);

module.exports = router;
