const faker = require("faker");
user = {
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: "12345678",
};
module.exports = user;
