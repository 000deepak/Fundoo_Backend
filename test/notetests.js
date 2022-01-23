const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

const rawdata = fs.readFileSync("test/notes.json");
const data = JSON.parse(rawdata);

/* add notes*/
describe("Post /addnotes", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/login")
      .send(data.LoginData)
      .end((err, res) => {
        token = res.body.data.token;
        console.log(token);
        res.should.have.status(200);
        done();
      });
  });

  //empty details
  it("given empty note details When added Should return status 500, success=true", (done) => {
    const input = data.Empty;
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
    const input = data.note;
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
  it("given string value for isArchived When added Should return status 500, success=true", (done) => {
    const input = data.isArchivedString;
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
  it("given boolean value for isArchived When added Should return status 200, success=true", (done) => {
    const input = data.isArchivedBoolean;
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

/* get notes*/
describe("get /getnotes", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/login")
      .send(data.LoginData)
      .end((err, res) => {
        token = res.body.data.token;
        console.log(token);
        res.should.have.status(200);
        done();
      });
  });

  //Incorrect jwt
  it("given proper note details When added Should return status 200, success=true", (done) => {
    const input = data.note;
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

  //correct jwt
  it("given proper note details When added Should return status 200, success=true", (done) => {
    const input = data.note;
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
});
