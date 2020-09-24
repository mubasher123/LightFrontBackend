const faker = require("faker");
const expect = require("chai").expect;
const sinon = require("sinon");
const alreadyLoggedIn = require("../../../HTTP/middleware/alreadyLoggedIn");

describe("Web User Authentication.", () => {
  it("Should check user is present in session.", async () => {
    const req = {
      session: {
        userId: faker.random.number(),
      },
    };

    const res = Object.create({});
    res.redirect = sinon.spy();
    res.status = function (status) {
      return this;
    };
    req.flash = sinon.spy();
    const next = sinon.spy();
    await alreadyLoggedIn(req, res, next);
    expect(res.redirect.calledOnce).to.be.true;
  });
});
