const { db } = require("../../config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(db.host);
class Product extends Sequelize.Model {}
Product.init(
  {
    productId: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,
      require: true,
    },

    asin: {
      type: Sequelize.STRING,
      allowNull: false,
      require: true,
    },
    rankInfo: {
      type: Sequelize.TEXT,
      get() {
        return JSON.parse(this.getDataValue("rankInfo"));
      },
      set(value) {
        this.setDataValue("rankInfo", JSON.stringify(value));
      },
    },
  },
  {
    sequelize,
    modelName: "Product",
    timestamps: true,
  }
);

Product.sync();
module.exports = Product;
