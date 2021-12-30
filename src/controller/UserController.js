//imports
let service = require("../services/UserServices");

class RegisterClass {
  //register user
  registerControl(req, res) {
    service
      .registerService(req)
      .then((result) => {
        console.log("inside controller ,successful ", result);
        res.send(result);
      })
      .catch((err) => {
        console.log("inside controller ,failed", err);
        res.send(err);
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

  //user Login
  loginControl(req, res) {
    service
      .loginService(req)
      .then((result) => {
        console.log(result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        res.send(JSON.stringify(err));
      });
  }

  //user Forget Password
  forgotPasswordController(req, res) {
    service
      .forgotPasswordService(req)
      .then((result) => {
        console.log(result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        res.send(JSON.stringify(err));
      });
  }

  //user reset Password
  resetPasswordController(req, res) {
    service
      .resetPasswordService(req)
      .then((result) => {
        console.log(result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        res.send(JSON.stringify(err));
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
