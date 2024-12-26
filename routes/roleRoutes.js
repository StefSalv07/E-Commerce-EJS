const express = require("express");
const router = express.Router();
const roleController = require("../controller/roleController");
//const  tokenMiddleware  = require('../../middleware/tokenMiddleware')

router.post("/add-role", roleController.addRole);
router.post("/update-role/:id", roleController.upadateRoleByid);
router.get("/get-roles", roleController.getAllRoles);
router.delete("/delete-role/:id", roleController.deleteRoleById);

module.exports = router;
