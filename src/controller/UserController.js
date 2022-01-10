//imports
const logger = require("../middleware/logger");
let service = require("../services/UserServices");

class RegisterClass {
  //user  Signup
  registerControl(req, res) {
    service
      .registerService(req)
      .then((result) => {
        logger.info("inside controller ,successful ", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        logger.error("inside controller ,failed", err);
        res.send(JSON.stringify(err));
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
        logger.error("inside controller ,failed", err);
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
        logger.error("inside controller ,failed", err);
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
        logger.error("inside controller ,failed", err);
        res.send(JSON.stringify(err));
      });
  }
}
//exports
module.exports = new RegisterClass();
