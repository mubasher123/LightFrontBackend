const {
  CommandHandlerMiddleware,
  ClassNameExtractor,
  InMemoryLocator,
} = require("simple-command-bus");
const ClassNameInflector = require("./ClassNameInflector");
const ProductHandler = require("../Product/Handler");

const commandHandlerMiddleware = new CommandHandlerMiddleware(
  new ClassNameExtractor(),
  new InMemoryLocator({
    SearchProductsHandler: new ProductHandler(),
  }),
  new ClassNameInflector()
);

module.exports = commandHandlerMiddleware;
