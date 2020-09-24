const faker = require("faker");
const expect = require("chai").expect;
const sinon = require("sinon");
const JwtAuthService = require("../../../App/Infrastructure/services/JwtAuthService");
const userIsLoggedIn = require("../../../HTTP/middleware/userIsLoggedIn");

describe("Web User Authentication.", () => {
  beforeEach(() => {
    sinon.stub(JwtAuthService.prototype, "userIsLoggedIn").returns(true);
  });

  it("Should check user is logged in.", async () => {
    const req = {
      body: {
        email: faker.internet.email(),
        password: "12345678",
      },
    };

    const res = Object.create({});
    res.status = function (status) {
      return this;
    };
    req.session = sinon.spy();
    req.flash = sinon.spy();
    const next = sinon.spy();
    await userIsLoggedIn(req, res, next);
    expect(next.calledOnce).to.be.true;
  });
});
