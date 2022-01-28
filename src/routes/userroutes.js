/**
 * @purpose      To forward control to handler fn when given path matches with url.
 * @module       routes
 * @file         userroutes.js
 * @author       deepak 
 * @since        27/12/2021
 */

//import
let express = require("express");
let controller = require("../controller/UserController");
const validate = require("../validators/UserValidation");
const auth = require("../middleware/authentication");

//create router object
let router = express.Router();

//api's
router.post("/register", validate.signUp, controller.registerControl);
router.post("/login", validate.login, controller.loginControl);
router.post("/forgotpassword", validate.email, controller.forgotPasswordController);
router.patch("/resetpassword", auth, validate.confirmPassword, controller.resetPasswordController);

module.exports=router;
 