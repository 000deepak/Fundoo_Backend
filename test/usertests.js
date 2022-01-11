const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

const rawdata = fs.readFileSync("test/user.json");
const employeeJSON = JSON.parse(rawdata);
let jwToken = "";


describe("POST /register", () => {
  it("given new UserData When added Should return status 200, success=true", (done) => {
    const input = employeeJSON.UserData;
    chai
      .request(server)
      .post("/register")
      .send(input)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.have.property("success").eq(true);
        response.body.should.have.property("message").eq("Registered Succesfully");
        done();
      });
  });
});
