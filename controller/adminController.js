const adminmodel = require("../model/adminModel");

exports.addAdmin = async (req, res) => {
  const admin = new adminmodel(req.body);

  const existingAdmin = await adminmodel.findOne({ email: req.body.email });
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  await admin
    .save()
    .then((data) => {
      if (!data || data == undefined) {
        return res.json({
          message: "Admin not saved",
          data: data,
          status: 400,
        });
      }
      console.log("Data", data);

      res.json({
        message: "Admin saved",
        data: data,
        status: 201,
      });
      console.log("Admin Saved", data);
    })
    .catch((err) => {
      console.log("Error in saving admin", err);
      res.json({
        message: "Error in saving admin",
        error: err,
        status: 500,
      });
    });
};
