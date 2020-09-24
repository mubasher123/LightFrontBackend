const { MethodNameInflector } = require("simple-command-bus");
ClassNameInflector = class ClassNameInflector extends MethodNameInflector {
  constructor(methodName) {
    super();
    this.methodName = methodName || "handle";
  }
  inflect(commandName, handler) {
    return this.methodName + commandName;
  }
};
module.exports = ClassNameInflector;
