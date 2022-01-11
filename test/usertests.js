const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

const rawdata = fs.readFileSync("test/user.json");
const data = JSON.parse(rawdata);
let jwToken = "";

/* user registration tests */
describe("POST /register", () => {
  //proper details
  it("given new UserData When added Should return status 200, success=true", (done) => {
    const input = data.UserData;
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

  //empty details
  it("given empty UserData When added Should return status 400", (done) => {
    const input = data.Empty;

    chai
      .request(server)
      .post("/register")
      .send(input)
      .end((err, res) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        res.should.have.status(500);
        done();
      });
  });

  //improper firstname
  it("given UserData with improper firstname When added Should return status 400", (done) => {
    const input = data.improperFirstName;

    chai
      .request(server)
      .post("/register")
      .send(input)
      .end((err, res) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        res.should.have.status(500);
        done();
      });
  });

    //improper lastname
    it("given UserData with improper firstname When added Should return status 400", (done) => {
      const input = data.improperLastName;
  
      chai
        .request(server)
        .post("/register")
        .send(input)
        .end((err, res) => {
          if (err) {
            console.log("Plz check again & enter with proper format");
            return done();
          }
          res.should.have.status(500);
          done();
        });
    });

      //improper email
  it("given UserData with improper email When added Should return status 400", (done) => {
    const input = data.improperEmail;

    chai
      .request(server)
      .post("/register")
      .send(input)
      .end((err, res) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        res.should.have.status(500);
        done();
      });
  });

    //improper password
    it("given UserData with improper password When added Should return status 400", (done) => {
      const input = data.improperPassword;
  
      chai
        .request(server)
        .post("/register")
        .send(input)
        .end((err, res) => {
          if (err) {
            console.log("Plz check again & enter with proper format");
            return done();
          }
          res.should.have.status(500);
          done();
        });
    });
  });
  
});
