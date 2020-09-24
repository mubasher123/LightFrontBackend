class Store {
  static buildMongooseStore(resourceStoreName) {
    const Store = require(`./Mongoose/${resourceStoreName}`);
    return new Store();
  }

  static buildSequelizeStore(resourceStoreName) {
    const Store = require(`./Sequelize/${resourceStoreName}`);
    return new Store();
  }
}
module.exports = Store;
