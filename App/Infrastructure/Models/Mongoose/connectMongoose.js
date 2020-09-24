const log = require("../../logs");
const mongoose = require("mongoose");
const { db } = require("../../config");

module.exports = function () {
  mongoose.connect(db.host);

  mongoose.connection.on("connected", function () {
    log.info("Mongoose default connection is open to " + db.host);
  });

  mongoose.connection.on("error", function (err) {
    log.error("Mongoose default connection has occurred" + err + " error");
  });

  mongoose.connection.on("disconnected", function () {
    log.info("Mongoose default connection is disconnected");
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      log.info(
        "Mongoose default connection is disconnected due to application termination"
      );
      process.exit(0);
    });
  });
};
module.exports.mongoose = mongoose;
