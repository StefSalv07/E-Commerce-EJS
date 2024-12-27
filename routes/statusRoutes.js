const express = require("express");
const router = express.Router();
const statusController = require("../controller/statusController");

router.post("/status", validate(statusValidation), statusController.addStatus);
router.put("/status/:id", statusController.updateStatusById);
router.get("/status", statusController.getAllStatuses);
router.get("/status/:id", statusController.getStatusById);
router.delete("/status/:id", statusController.deleteStatusById);

module.exports = router;
