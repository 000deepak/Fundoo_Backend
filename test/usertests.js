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
/*   it.only("given new proper UserData When added Should return status 201, success=true", (done) => {
    const input = data.UserData;
    chai
      .request(server)
      .post("/users/register")
      .send(input)
      .end((err, response) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        response.should.have.status(201);
        response.body.should.have.property("success").eq(true);
        done();
      });
  }); */

  //empty details
  it("given empty UserData When added Should return status 500", (done) => {
    const input = data.Empty;

    chai
      .request(server)
      .post("/users/register")
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
  it("given UserData with improper firstname When added Should return status 500", (done) => {
    const input = data.improperFirstName;

    chai
      .request(server)
      .post("/users/register")
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
  it("given UserData with improper firstname When added Should return status 500", (done) => {
    const input = data.improperLastName;

    chai
      .request(server)
      .post("/users/register")
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
  it("given UserData with improper email When added Should return status 500", (done) => {
    const input = data.improperEmail;

    chai
      .request(server)
      .post("/users/register")
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
  it("given UserData with improper password When added Should return status 500", (done) => {
    const input = data.improperPassword;

    chai
      .request(server)
      .post("/users/register")
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

/* Login Test Cases */
describe("POST /login", () => {
  //proper details
  it("given proper login UserData When added Should return status 200, success=true", (done) => {
    const input = data.LoginData;
    chai
      .request(server)
      .post("/users/login")
      .send(input)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.have.property("success").eq(true);
        response.body.should.have.property("message").eq("Login Successfull");
        done();
      });
  });

  //empty details
  it("given empty UserData When added Should return status 500", (done) => {
    const input = data.Empty;

    chai
      .request(server)
      .post("/users/login")
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

  //incorrect email
  it("given UserData with improper email When added Should return status 404", (done) => {
    const input = data.improperLoginEmail;

    chai
      .request(server)
      .post("/users/login")
      .send(input)
      .end((err, res) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        res.should.have.status(404);
        done();
      });
  });

  //incorrect  password
  it("given UserData with improper password When added Should return status 401", (done) => {
    const input = data.improperLoginPassword;

    chai
      .request(server)
      .post("/users/login")
      .send(input)
      .end((err, res) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        res.should.have.status(401);
        done();
      });
  });
});

/* forgot password */
describe("POST /forgotpassword", () => {
  //proper details
  it("given proper User Email When added Should return status 200, success=true", (done) => {
    const input = data.correctEmail;
    chai
      .request(server)
      .post("/users/forgotpassword")
      .send(input)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.have.property("success").eq(true);
        done();
      });
  });

  //empty details
  it("given empty UserData When added Should return status 500", (done) => {
    const input = data.Empty;

    chai
      .request(server)
      .post("/users/forgotpassword")
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

  //incorrect email
  it("given UserData with incorrect email When added Should return status 404", (done) => {
    const input = data.incorrectEmail;

    chai
      .request(server)
      .post("/users/forgotpassword")
      .send(input)
      .end((err, res) => {
        if (err) {
          console.log("Plz check again & enter with proper format");
          return done();
        }
        res.should.have.status(404);
        done();
      });
  });
});

/* resetpassword */
describe("PATCH /resetpassword", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/users/login")
      .send(data.LoginData)
      .end((err, res) => {
        token = res.body.data.token;
        console.log(token);
        res.should.have.status(200);
        done();
      });
  });

/*   //proper details
  it("given proper password When added Should return status 200, success=true", (done) => {
    const input = data.newPassword;
    chai
      .request(server)
      .patch("/resetpassword")
      .set({ token: token })
      .send(input)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.have.property("success").eq(true);
        done();
      });
  }); */

  //improper  password
  it("given UserData with improper password When added Should return status 500", (done) => {
    const input = data.newImproperPassword;

    chai
      .request(server)
      .patch("/users/resetpassword")
      .set({ token: token })
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
