const log = require("../../logs");
const { db } = require("../../config");
const Sequelize = require("sequelize");
module.exports = () => {
  const sequelize = new Sequelize(db.host);
  sequelize
    .authenticate()
    .then(() => {
      log.info("Connection has been established successfully.");
    })
    .catch((err) => {
      log.error("Unable to connect to the database:", err);
    });
};
