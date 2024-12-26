const rolemodel = require("../model/roleModel");
exports.addRole = async (req, res) => {
  const rolename = req.body.roleName;

  // Check if a role with the same name already exists
  rolemodel
    .findOne({ roleName: rolename })
    .then((existingRole) => {
      if (existingRole) {
        return res.status(400).json({
          message: "Role with the same name already exists",
          status: 400,
        });
      }

      // If role doesn't exist, create and save the new role
      const role = new rolemodel(req.body);
      return role.save();
    })
    .then((savedRole) => {
      if (!savedRole) {
        return res.status(400).json({
          message: "Role not saved",
          data: savedRole,
          status: 400,
        });
      }

      res.status(201).json({
        message: "Role saved successfully",
        data: savedRole,
        status: 201,
      });
      console.log("Role Saved", savedRole);
    })
    .catch((error) => {
      console.error("Error in saving role", error);
      res.status(500).json({
        message: "Error in saving role",
        error: error.message,
        status: 500,
      });
    });
};
exports.getAllRoles = async (req, res) => {
  rolemodel
    .find()
    .then((roles) => {
      res.status(200).json({
        message: "All roles fetched successfully",
        data: roles,
        status: 200,
      });
    })
    .catch((error) => {
      console.error("Error in fetching roles", error);
      res.status(500).json({
        message: "Error in fetching roles",
        error: error.message,
        status: 500,
      });
    });
};
exports.upadateRoleByid = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  rolemodel
    .findByIdAndUpdate(id, updatedData, { new: true })
    .then((updatedRole) => {
      if (!updatedRole) {
        return res.status(404).json({
          message: "Role not found or update failed",
          status: 404,
        });
      }

      res.status(200).json({
        message: "Role updated successfully",
        data: updatedRole,
        status: 200,
      });
      console.log("Role Updated", updatedRole);
    })
    .catch((error) => {
      console.error("Error in updating role", error);
      res.status(500).json({
        message: "Error in updating role",
        error: error.message,
        status: 500,
      });
    });
};
exports.deleteRoleById = (req, res) => {
  const { id } = req.params;

  rolemodel
    .findByIdAndDelete(id)
    .then((deletedRole) => {
      if (!deletedRole) {
        return res.status(404).json({
          message: "Role not found or already deleted",
          status: 404,
        });
      }

      res.status(200).json({
        message: "Role deleted successfully",
        data: deletedRole,
        status: 200,
      });
      console.log("Role Deleted", deletedRole);
    })
    .catch((error) => {
      console.error("Error in deleting role", error);
      res.status(500).json({
        message: "Error in deleting role",
        error: error.message,
        status: 500,
      });
    });
};
