const mongoose = require("mongoose");
const sinon = require("sinon");
const userEventsListner = require("../../App/Application/events/userEventsListner");
const { db } = require("../../App/Infrastructure/config");
mongoose.connect(db.test_host);

before(() => {
  sinon
    .stub(userEventsListner._events, "userIsRegistered")
    .returns("Email Sent Successfully.");
  sinon
    .stub(userEventsListner._events, "resetPasswordRequest")
    .returns("Email Sent Successfully.");
  sinon
    .stub(userEventsListner._events, "passwordUpdated")
    .returns("Password Updated Successfully.");
});

beforeEach((done) => {
  console.log("Clear database", db.host);
  try {
    mongoose.connection.db.dropDatabase(function (err, result) {
      done();
    });
  } catch (e) {
    done();
    console.log(e);
  }
});
