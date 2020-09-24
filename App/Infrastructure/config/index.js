const application = require("./application");
const database = require("./database");
const applicationSecretKey = require("./applicationSecretKey");

module.exports = {
  db: database,
  application: application,
  applicationSecretKey: applicationSecretKey(),
};
