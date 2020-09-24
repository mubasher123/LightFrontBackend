const Product = require("../../Models/Sequelize/Product");
const ProductEntity = require("../../../Domain/Entities/Product");

class SequelizeProductStore {
  static buildStore() {
    return new SequelizeProductStore();
  }

  async findByAsin(asin) {
    return await Product.findOne({
      where: { asin: asin },
    });
  }

  async createOrUpdate(params) {
    const productIsPresent = await Product.findOne({
      where: { asin: params.asin },
    });

    if (productIsPresent) {
      const rankInfo = productIsPresent.rankInfo;
      rankInfo.push(params.rankInfo[0]);
      await Product.update(
        { rankInfo: rankInfo },
        {
          where: { asin: params.asin },
        }
      );
    } else {
      await Product.create(ProductEntity.createFromDetails(params));
    }
  }
}
module.exports = SequelizeProductStore;
