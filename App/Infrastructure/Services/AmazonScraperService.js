const amazonScraper = require("../Utils/Amazon");

class AmazonScraperService {
  constructor(params) {
    this.keyword = params.keyword;
    this.asin = params.asin;
  }

  async products(keyword) {
    return await amazonScraper.products({
      keyword: this.keyword,
      number: 50,
    });
  }
}
module.exports = AmazonScraperService;
