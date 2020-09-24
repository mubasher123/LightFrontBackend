const AmazonScraperService = require("../../Infrastructure/Services/AmazonScraperService");
const productService = require("../../Domain/services/product");
class ProductHandler {
  async handleSearchProductsCommand(command) {
    const amazonScraperService = new AmazonScraperService(
      command.productDetails()
    );
    const matchedProduct = {};

    const response = await amazonScraperService.products();
    response.result.map((p) => {
      if (p.asin === command.asin) {
        matchedProduct.asin = p.asin;
        matchedProduct.rankInfo = [
          {
            data: new Date(),
            page: p.page,
            position: p.position,
            absolute_position: p.absolute_position,
          },
        ];
      }
    });
    if (matchedProduct.asin) {
      await productService.createOrUpdate(matchedProduct);
    }
    if (!matchedProduct.asin) {
      return {};
    } else {
      return productService.findByAsin(matchedProduct.asin);
    }
  }
}

module.exports = ProductHandler;
