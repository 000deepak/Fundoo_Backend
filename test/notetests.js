const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

const userrawdata = fs.readFileSync("test/user.json");
const userdata = JSON.parse(userrawdata);

const noterawdata = fs.readFileSync("test/notes.json");
const notedata = JSON.parse(noterawdata);

/* add notes*/
describe("Post /addnotes", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/login")
      .send(userdata.LoginData)
      .end((err, res) => {
        token = res.body.data.token;
        console.log(token);
        res.should.have.status(200);
        done();
      });
  });

  //empty details
  it.only("given empty note details When added Should return status 500, success=true", (done) => {
    const input = notedata.Empty;
    chai
      .request(server)
      .post("/addnotes")
      .set({ token: token })
      .send(input)
      .end((error, response) => {
        response.should.have.status(500);
        done();
      });
  });


});
