const request = require("supertest");
const express = require("express");
const app = express();
describe("Api Routes.", () => {
  it("check api login route.", () => {
    request(app).get("/api/v1/login").expect(200);
  });

  it("check api users route.", () => {
    request(app).get("/api/v1/users").expect(200);
  });
});
