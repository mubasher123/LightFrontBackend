const Factory = require("./Factory");
const ResourceStore = require("../Stores/ResourceStore");
class ResourceFactory extends Factory {
  static buildStore(resourceStoreName) {
    if (this.isMongooseDriver()) {
      return ResourceStore.buildMongooseStore(resourceStoreName);
    } else if (this.isSequelizeDriver()) {
      return ResourceStore.buildSequelizeStore(resourceStoreName);
    }
  }
}
module.exports = ResourceFactory;
