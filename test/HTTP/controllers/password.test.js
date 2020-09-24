const expect = require("chai").expect;
const sinon = require("sinon");
const userService = require("../../../App/Domain/services/user");
const fakeUserObject = require("../../fakeObjects/user");
const passwordController = require("../../../HTTP/controllers/password");
const UserFactory = require("../../../App/Infrastructure/factories/UserFactory");
const store = UserFactory.buildUserStore();
let user = {};
describe("Password Controller.", () => {
  beforeEach(async () => {
    userObject = await userService.create(fakeUserObject);
    user = userObject.user;
  });

  it("Should request for password.", async () => {
    const req = {
      body: {
        email: user.email,
      },
    };

    const res = Object.create({});
    res.status = function (status) {
      return this;
    };
    req.flash = sinon.spy();
    res.redirect = sinon.spy();
    await passwordController.reset(req, res);
    expect(res.redirect.calledOnce).to.be.true;
    expect(req.flash.calledOnce).to.be.true;
  });

  it("Should update password.", async () => {
    user.passwordResetToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const today = new Date();
    user.passwordResetExpires = today.setDate(today.getDate() + 1);
    await store.update(user);
    const req = {
      body: {
        token: user.passwordResetToken,
        password: "12345678",
        confirmpassword: "12345678",
      },
    };

    const res = Object.create({});
    res.status = function (status) {
      return this;
    };
    req.flash = sinon.spy();
    res.redirect = sinon.spy();
    await passwordController.update(req, res);
    expect(res.redirect.calledOnce).to.be.true;
    expect(req.flash.calledOnce).to.be.true;
  });
});
