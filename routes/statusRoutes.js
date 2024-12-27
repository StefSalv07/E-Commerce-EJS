const express = require("express");
const router = express.Router();
const statusController = require("../controller/statusController");

router.post("/add-status", statusController.addStatus);
router.put("/update-status/:id", statusController.updateStatusById);
router.get("/get-status", statusController.getAllStatuses);
router.get("/get-status/:id", statusController.getStatusById);
router.delete("/status/:id", statusController.deleteStatusById);
router.delete("/dall-status", statusController.deleteAllStatuses);

module.exports = router;
