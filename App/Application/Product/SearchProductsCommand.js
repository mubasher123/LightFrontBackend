const { Command } = require("simple-command-bus");
class SearchProductsCommand extends Command {
  constructor(keyword, asin) {
    super();
    this.keyword = keyword;
    this.asin = asin;
  }

  productDetails() {
    return {
      keyword: this.keyword,
      asin: this.asin,
    };
  }
}
module.exports = SearchProductsCommand;
