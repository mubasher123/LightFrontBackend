const uuidv1 = require("uuid/v1");
class ProductEntity {
  constructor(productId, asin, rankInfo) {
    this.productId = productId;
    this.asin = asin;
    this.rankInfo = rankInfo;
  }

  static createFromDetails(params) {
    return new ProductEntity(uuidv1(), params.asin, params.rankInfo);
  }

  static createFromObject(obj) {
    return new ProductEntity(obj.productId, obj.asin, obj.rankInfo);
  }
}

module.exports = ProductEntity;
