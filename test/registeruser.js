const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../index");

chai.use(chaiHttp);
chai.should();
const noteData = require("./note.Token.json");
//const faker = require("faker");

describe("Create Note", () => {
  it("when call create note api, should return appropriate response from controller", (done) => {
    const token = noteData.notes.validToken;

    const createNotes = {
      title: "dee10",
      description: "Kumhbar",
      colour: "#fff",
      isArchived: true,
      isDeleted: true
    };
    chai
      .request(server)
      .post("/addnotes")
      .set({ authorization: token })
      .send(createNotes)
      .end((err, res) => {
        if (err) {
          console.log("plz check your credential");
          return done();
        }
        res.should.have.status(200);
        return done();
      });
  });
});
