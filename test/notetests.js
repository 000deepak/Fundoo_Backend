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
      .post("/users/login")
      .send(data.LoginData)
      .end((err, res) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        token = res.body.data.token;
        console.log(token);
        res.should.have.status(200);
        done();
      });
  });

  //empty details
  it("given empty note details When added Should return status 500", (done) => {
    const input = data.Empty;
    chai
      .request(server)
      .post("/notes/addnotes")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(500);
        done();
      });
  });

  //proper details
  it("given proper note details When added Should return status 200, success=true", (done) => {
    const input = data.note;
    chai
      .request(server)
      .post("/notes/addnotes")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(201);
        response.body.should.have.property("success").eq(true);
        response.body.should.have.property("message").eq("Notes Saved");
        done();
      });
  });

  //string value for is Archived
  it("given string value for isArchived When added Should return status 500", (done) => {
    const input = data.isArchivedString;
    chai
      .request(server)
      .post("/notes/addnotes")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(500);
        done();
      });
  });

  //boolean value for is Archived
  it("given boolean value for isArchived When added Should return status 200, success=true", (done) => {
    const input = data.isArchivedBoolean;
    chai
      .request(server)
      .post("/notes/addnotes")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
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
      .post("/users/login")
      .send(data.LoginData)
      .end((err, res) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        token = res.body.data.token;
        console.log(token);
        res.should.have.status(200);
        done();
      });
  });

  //Incorrect jwt
  it("given Incorrect jwt When added Should return status 401, success=true", (done) => {

    chai
      .request(server)
      .get("/notes/notes")
      .set({ token: "asdfgh" })
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(401);
        done();
      });
  });

  //correct jwt
  it("given correct jwt When added Should return status 200, success=true", (done) => {

    chai
      .request(server)
      .get("/notes/notes")
      .set({ token: token })
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(200);
        response.body.should.have.property("success").eq(true);
        done();
      });
  });
});

/* update notes*/
describe("put /updatenotes", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/users/login")
      .send(data.LoginData)
      .end((err, res) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        token = res.body.data.token;
        console.log(token);
        res.should.have.status(200);
        done();
      });
  });

  //Incorrect jwt
  it("given Incorrect jwt When added Should return status 401", (done) => {
    const input = data.note;
    chai
      .request(server)
      .put("/notes/update")
      .set({ token: 2345 })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(401);
        done();
      });
  });

  //correct jwt
  it("given correct jwt When added Should return status 200", (done) => {
    const input = data.Cid;
    chai
      .request(server)
      .put("/notes/update")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(200);
        response.body.should.have.property("message").eq("Note Updated Successfully");
        done();
      });
  });

  //correct noteId
  it("given proper correct noteId When added Should return status 200, success=true", (done) => {
    const input = data.Cid;
    chai
      .request(server)
      .put("/notes/update")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(200);
        response.body.should.have.property("success").eq(true);
        response.body.should.have.property("message").eq("Note Updated Successfully");
        done();
      });
  });

  //Incorrect noteId
  it("given Incorrect noteId When added Should return status 404", (done) => {
    const input = data.ICid;
    chai
      .request(server)
      .put("/notes/update")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(404);
        response.body.should.have.property("success").eq(false);
        done();
      });
  });

  //empty title
  it("given empty title When added Should return status 500", (done) => {
    const input = data.notitle;
    chai
      .request(server)
      .put("/notes/update")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(500);

        done();
      });
  });

  //string value in isArchive value
  it("given string value in isArchive value instead of boolean When added Should return status 500, success=true", (done) => {
    const input = data.isArchivedString;
    chai
      .request(server)
      .put("/notes/update")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(500);
        done();
      });
  });
});

/* delete notes*/
describe("delete /deletenotes", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/users/login")
      .send(data.LoginData)
      .end((err, res) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        token = res.body.data.token;
        console.log(token);
        res.should.have.status(200);
        done();
      });
  });

  //Incorrect jwt
  it("given Incorrect jwt When added Should return status 401", (done) => {
    const input = data.noteId1;
    chai
      .request(server)
      .delete("/notes/delete")
      .set({ token: 2345 })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(401);
        done();
      });
  });

  //correct jwt
  it("given correct jwt When added Should return status 200, success=true", (done) => {
    const input = data.deleteId;
    chai
      .request(server)
      .delete("/notes/delete")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(200);
        response.body.should.have.property("success").eq(true);
        done();
      });
  });

  //correct noteId
  it("given proper correct noteId When added Should return status 200, success=true", (done) => {
    const input = data.Ciddelete;
    chai
      .request(server)
      .delete("/notes/delete")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(200);
        response.body.should.have.property("success").eq(true);
        done();
      });
  });

  //Incorrect noteId
  it("given Incorrect noteId When added Should return status 404, success=true", (done) => {
    const input = data.ICiddelete;
    chai
      .request(server)
      .delete("/notes/delete")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(404);
        done();
      });
  });
});

/* isArchived notes*/
describe("get /archivednotes", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/users/login")
      .send(data.LoginData)
      .end((err, res) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        token = res.body.data.token;
        console.log(token);
        res.should.have.status(200);
        done();
      });
  });

  //Incorrect jwt
  it("given Incorrect jwt When added Should return status 401", (done) => {
    const input = data.note;
    chai
      .request(server)
      .get("/notes/archived")
      .set({ token: 2345 })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(401);
        done();
      });
  });

  //correct jwt
  it("given correct jwt When added Should return status 200", (done) => {
    const input = data.note;
    chai
      .request(server)
      .get("/notes/archived")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(200);
        done();
      });
  });
});

/* isDeleted notes*/
describe("put /deletenotes", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/users/login")
      .send(data.LoginData)
      .end((err, res) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        token = res.body.data.token;
        console.log(token);
        res.should.have.status(200);
        done();
      });
  });

  //Incorrect jwt
  it("given Incorrect jwt When added Should return status 401", (done) => {
    const input = data.note;
    chai
      .request(server)
      .get("/notes/deleted")
      .set({ token: 2345 })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(401);
        done();
      });
  });

  //correct jwt
  it("given correct jwt When added Should return status 200", (done) => {
    const input = data.note;
    chai
      .request(server)
      .get("/notes/deleted")
      .set({ token: token })
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(200);
        done();
      });
  });
});
