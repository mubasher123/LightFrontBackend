const expect = require("chai").expect;
const sinon = require("sinon");
const userService = require("../../../App/Domain/services/user");
const fakeUserObject = require("../../fakeObjects/user");
const authenticateWebUser = require("../../../HTTP/middleware/authenticateWebUser");
const UserFactory = require("../../../App/Infrastructure/factories/UserFactory");
const store = UserFactory.buildUserStore();
let user = {};

describe("Web User Authentication.", () => {
  beforeEach(async () => {
    userObject = await userService.create(fakeUserObject);
    user = userObject.user;
  });

  it("Should logged in  successfully.", async () => {
    const req = {
      body: {
        email: user.email,
        password: "12345678",
      },
    };

    const res = Object.create({});
    res.status = function (status) {
      return this;
    };
    req.session = sinon.spy();
    req.flash = sinon.spy();
    res.redirect = sinon.spy();
    await authenticateWebUser(req, res);
    expect(res.redirect.calledOnce).to.be.true;
    expect(req.flash.calledOnce).to.be.true;
  });
});
