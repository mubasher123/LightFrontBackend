require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const flash = require("express-flash-messages");
const cors = require("cors");
const { applicationSecretKey } = require("../../App/Infrastructure/config");
require("../../App/Infrastructure/Models/dataBaseConnection");
const apiRoutes = require("../routes/api/v1/apiRoutes");
const log = require("../../App/Infrastructure/logs");
const sassMiddleware = require("node-sass-middleware");
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use("/static", express.static(path.join(__dirname, "../../static")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(cors());
app.use((req, res, next) => {
  log.info(`${req.method} ${req.url}`);
  next();
});
app.use("/api/v1/", apiRoutes);
module.exports = app;