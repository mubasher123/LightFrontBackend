const { db } = require("../config");
const connectMongoose = require("./Mongoose/connectMongoose");
const connectSequelize = require("./Sequelize/connectSequelize");
module.exports = (() => {
  if (db.driver === "mongoose") {
    connectMongoose();
  }
  if (db.driver === "sequelize") {
    connectSequelize();
  }
})();
