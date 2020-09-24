const request = require("supertest");
const express = require("express");
const app = express();
describe("Application Routes.", () => {
  it("check homepage route.", () => {
    request(app).get("/").expect(200);
  });

  it("check dashboard route.", () => {
    request(app).get("/dashboard").expect(200);
  });

  it("check login route.", () => {
    request(app).get("/login").expect(200);
  });

  it("check login route.", async () => {
    request(app).post("/login").expect(200);
  });

  it("check signup route.", () => {
    request(app).get("/signup").expect(200);
  });

  it("check signup route.", async () => {
    request(app).post("/signup").expect(200);
  });

  it("check resetpassword route.", async () => {
    request(app).get("/resetpassword").expect(200);
  });

  it("check resetpassword route.", async () => {
    request(app).post("/resetpassword").expect(200);
  });

  it("check updatepassword route.", async () => {
    request(app).get("/updatepassword").expect(200);
  });

  it("check updatepassword route.", async () => {
    request(app).post("/updatepassword").expect(200);
  });
});
