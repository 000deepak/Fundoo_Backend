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
  it("given empty note details When added Should return status 500, success=true", (done) => {
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

  //proper details
  it("given proper note details When added Should return status 200, success=true", (done) => {
    const input = notedata.note;
    chai
      .request(server)
      .post("/addnotes")
      .set({ token: token })
      .send(input)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.have.property("success").eq(true);
        response.body.should.have.property("message").eq("Notes Saved");
        done();
      });
  });

  //string value for is Archived
  it.only("given string value for isArchived When added Should return status 500, success=true", (done) => {
    const input = notedata.isArchivedString;
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

  //boolean value for is Archived
  it.only("given boolean value for isArchived When added Should return status 200, success=true", (done) => {
    const input = notedata.isArchivedBoolean;
    chai
      .request(server)
      .post("/addnotes")
      .set({ token: token })
      .send(input)
      .end((error, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
