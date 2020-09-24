const expect = require("chai").expect;
const faker = require("faker");
const ValidationError = require("mongoose").Error.ValidationError;
const AppError = require("../../../../HTTP/errors/appError");
const userService = require("../../../../App/Domain/services/user");
const userDetails = require("../../../fakeObjects/user");
const UserEntity = require("../../../../App/Domain/entities/User");
const UserFactory = require("../../../../App/Infrastructure/factories/UserFactory");
const store = UserFactory.buildUserStore();

describe("User Service methods", async () => {
  beforeEach(async () => {
    const userObj = UserEntity.createFromDetails(userDetails);
    await userObj.setPassword(faker.internet.password());
    await store.add(userObj);
  });

  it("expects user must not be created due to validation.", async () => {
    const userRequestBody = {
      name: "",
      email: "",
      password: "",
    };
    try {
      await userService.create(userRequestBody);
    } catch (e) {
      expect(e).to.be.an.instanceOf(ValidationError);
    }
  });

  it("expects user is already created.", async () => {
    const userRequestBody = {
      name: faker.name.findName(),
      email: userDetails.email,
      password: faker.internet.password(),
    };
    try {
      await userService.create(userRequestBody);
    } catch (e) {
      expect(e).to.be.an.instanceOf(AppError);
    }
  });

  it("creates a user", async () => {
    const userRequestBody = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const userResponse = await userService.create(userRequestBody);
    expect(userResponse.user).to.be.an.instanceOf(UserEntity);
  });

  it("should update user password", async () => {
    const usersList = await store.first();
    const user = usersList[0];
    const userResponse = await userService.updatePassword({
      userId: user.userId,
      password: "12345678",
      confirmPassword: "12345678",
    });
    expect(userResponse.message).eq("Password updated successfully.");
  });
});
