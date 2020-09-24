const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const applicationBinding = require("../../../../App/Application/Utils/applicationBinding");
const SearchProductsCommand = require("../../../../App/Application/Product/SearchProductsCommand");
const handleError = require("../../../utils/handleError");

const commandBus = new CommandBus([
  new LoggerMiddleware(console),
  applicationBinding,
]);

exports.searchProducts = async (req, res) => {
  try {
    const { keyword, asin } = req.query;
    const command = new SearchProductsCommand(keyword, asin);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};
