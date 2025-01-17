const express = require("express");
const dotenv = require("dotenv");
const fileupload = require("express-fileupload");
dotenv.config();
const cors = require("cors");
const app = express();
const path = require("path");
const { dbConnection } = require("./config/dbConfig");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileupload({
    useTempFiles: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.set("view engine", "ejs");

dbConnection();
// routes for apis
// app.all("/api");
const addressRoutes = require("./routes/addressRoutes");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const statusRoutes = require("./routes/statusRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subCategoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
// const adminRoutes = require("./routes/adminRoutes");
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/sub-category", subcategoryRoutes);
app.use("/api/brand", brandRoutes);
// app.use("/api/admin", adminRoutes);
// rendering to the front end
app.get("/", (req, res) => {
  res.render("index", { baseUrl: "" });
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contactUs");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("register");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.listen(3000, (err) => {
  if (err) {
    console.log("Error in starting server");
  }
  console.log(
    "!!!!!=====================Server Started On Port 3000==================================!!!!!"
  );
});
