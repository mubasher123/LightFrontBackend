const logger = require("../../App/Infrastructure/logs");
const AppError = require("../errors/appError");
const handleError = (err, res) => {
  logger.debug(err);
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: err.message
    });
  }
  return res.status(500).json({
    error: err.message
  });
};
module.exports = handleError;
