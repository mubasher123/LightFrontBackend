// const expect = require("chai").expect;
// const faker = require("faker");
// const sinon = require("sinon");
// const UserStore = require("../../../../../App/Infrastructure/stores/sequelize/UserStore");
// const userDetails = require("../../../../fakeObjects/user");
// const UserEntity = require("../../../../../App/Domain/entities/User");
// const store = new UserStore();

// describe("User Store methods", async () => {
//   beforeEach(async () => {
//     const userObj = UserEntity.createFromDetails(userDetails);
//     await userObj.setPassword(faker.internet.password());
//     await store.add(userObj);
//   });

//   it("should find user with given userId.", async () => {
//     const latestUsers = await store.first();
//     const user = latestUsers[0];
//     const userFromDb = await store.findByUserId(user.userId);
//     expect(userFromDb).to.be.instanceOf(UserEntity);
//   });

//   it("should count the users.", async () => {
//     const count = await store.count();
//     expect(count).eq(1);
//   });

//   it("should check user is present in Database.", async () => {
//     const latestUsers = await store.first();
//     const user = latestUsers[0];
//     const result = await store.userIsPresent(user.userId);
//     expect(result).eq(true);
//   });
// });
