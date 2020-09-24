require("dotenv").config();
module.exports = {
  host: process.env.DATABASE_URL,
  test_host: process.env.TEST_DATABASE_URL,
  driver: process.env.DATABASEDRIVER,
};
