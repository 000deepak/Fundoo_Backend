//imports
let service = require("../Services/services");

//control class
class RegisterClass {
  //register user
  registerControl(req, res) {
    service
      .registerService(req.body)
      .then((result) => {
        console.log("inside controller ,successful ", result);
      })
      .catch((err) => {
        console.log("inside controller ,failed", err);
      });
  }

  //get all users
  getController(req, res) {
    service
      .getService(req)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("inside controller ,failed", err);
      });
  }

  //get user by id
  loginControl(req, res) {
    service.loginService(req).then((result) => {
      console.log(result);
    });
  }

  //update user by id.
  putController(req, res) {
    service.putService(req).then((result) => {
      console.log(result);
    });
  }

  //Delete by Id
  deleteController(req, res) {
    service.deleteService(req).then((result) => {
      console.log(result);
    });
  }
}
//exports
module.exports = new RegisterClass();

//1.import service
//2.forwading operation
//3.export controller
