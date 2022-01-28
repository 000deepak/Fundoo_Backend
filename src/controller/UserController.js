/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         UserController.js
 * @author       deepak
 * @since        27/12/2021
 */

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
        logger.info("successful ", result);
        res.status(result.status).json(result);
      })
      .catch((err) => {
        logger.error("failed", err);
        res.status(err.status).json(err);
      });
  }

  //user Login
  loginControl(req, res) {
    service
      .loginService(req)
      .then((result) => {
        logger.info("successful login", result);
        //console.log(res.body.data.token);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("login failed", err);
        res.status(err.status).json(err);
      });
  }

  //user Forget Password
  forgotPasswordController(req, res) {
    service
      .forgotPasswordService(req)
      .then((result) => {
        logger.info("forgotpassword successful", result);
        res.status(result.status).json(result);
      })
      .catch((err) => {
        logger.error("forgot password failed", err);
        res.status(err.status).json(err);
      });
  }

  //user reset Password
  resetPasswordController(req, res) {
    service
      .resetPasswordService(req)
      .then((result) => {
        logger.info("reset password successful ", result);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("reset password failed", err);
        res.status(err.status).json(err);
      });
  }
}
//exports
module.exports = new RegisterClass();
