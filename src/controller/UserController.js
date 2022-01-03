//imports
const logger = require("../middleware/logger");
let service = require("../services/UserServices");

class RegisterClass {
  //register user
  registerControl(req, res) {
    service
      .registerService(req)
      .then((result) => {
        logger.info("inside controller ,successful ", result);
        res.send(result);
      })
      .catch((err) => {
        logger.err("inside controller ,failed", err);
        res.send(err);
      });
  }

  //get all users
  getController(req, res) {
    service
      .getService(req)
      .then((result) => {
        logger.info("inside controller ,successful ", result);
        res.send(result);
      })
      .catch((err) => {
        logger.err("inside controller ,failed", err);
      });
  }

  //user Login
  loginControl(req, res) {
    service
      .loginService(req)
      .then((result) => {
        logger.info("inside controller ,successful ", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        logger.err("inside controller ,failed", err);
        res.send(JSON.stringify(err));
      });
  }

  //user Forget Password
  forgotPasswordController(req, res) {
    service
      .forgotPasswordService(req)
      .then((result) => {
        logger.info("inside controller ,successful ", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        logger.err("inside controller ,failed", err);
        res.send(JSON.stringify(err));
      });
  }

  //user reset Password
  resetPasswordController(req, res) {
    service
      .resetPasswordService(req)
      .then((result) => {
        logger.info("inside controller ,successful ", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        logger.err("inside controller ,failed", err);
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
