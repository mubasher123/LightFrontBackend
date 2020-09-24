const expect = require("chai").expect;
const faker = require("faker");
const sinon = require("sinon");
const usersController = require("../../../HTTP/controllers/users");

describe("Users Controller.", () => {
  it("Should redirect on user registration successfully.", async () => {
    const req = {
      body: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    };

    const res = Object.create({});
    res.status = function (status) {
      return this;
    };
    req.flash = sinon.spy();
    res.redirect = sinon.spy();
    await usersController.create(req, res);
    expect(res.redirect.calledOnce).to.be.true;
    expect(req.flash.calledOnce).to.be.true;
  });
});
