const ResourceFactory = require("../../Infrastructure/Factories/ResourceFactory");
const resourceStoreName = "Product";
const store = ResourceFactory.buildStore(resourceStoreName);

exports.findByAsin = async (asin) => {
  return await store.findByAsin(asin);
};

exports.createOrUpdate = async (params) => {
  return await store.createOrUpdate(params);
};
