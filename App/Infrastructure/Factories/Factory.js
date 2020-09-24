const { db } = require("../config");
class Factory {
  static isMongooseDriver() {
    return db.driver == "mongoose"
  }

  static isSequelizeDriver() {
    return db.driver == "sequelize"
  }
}
module.exports = Factory;