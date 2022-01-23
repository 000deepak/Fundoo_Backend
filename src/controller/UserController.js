//imports
const { response } = require("express");
const logger = require("../middleware/logger");
let service = require("../services/UserServices");

class RegisterClass {
  //user  Signup
  registerControl(req, res) {
    service
      .registerService(req)
      .then((result) => {
        logger.info("inside controller ,successful ", result);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("inside controller ,failed", err);
        res.status(err.status).json(err);
      });
  }

  //user Login
  loginControl(req, res) {
    service
      .loginService(req)
      .then((result) => {
        logger.info("inside controller ,successful ", result);
        //console.log(res.body.data.token);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("inside controller ,failed", err);
        res.status(err.status).json(err);
      });
  }

  //user Forget Password
  forgotPasswordController(req, res) {
    service
      .forgotPasswordService(req)
      .then((result) => {
        logger.info("inside controller ,successful ", result);
        res.status(result.status).json(result);
      })
      .catch((err) => {
        logger.error("inside controller ,failed", err);
        res.status(500).json(err);
      });
  }

  //user reset Password
  resetPasswordController(req, res) {
    service
      .resetPasswordService(req)
      .then((result) => {
        logger.info("inside controller ,successful ", result);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("inside controller ,failed", err);
        res.status(err.status).json(err);
      });
  }
}
//exports
module.exports = new RegisterClass();
