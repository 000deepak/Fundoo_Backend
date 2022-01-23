/**
 * @purpose      To divert control to admin routes when given path is hit.
 * @module       index
 * @file         index.js
 * @author       deepak
 * @since        9/1/2022
 */

//import
let express = require("express");

//create router object
let router = express.Router();


let user =require("./userroutes");
let note =require("./noteroutes");

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get("/", (req, res) => {
    res.json("Welcome to employee payroll application");
  });
  router.use("/users", user);
  router.use("/notes", note);

  return router;
};

module.exports=routes;

/* 
 //import
let express = require("express");
let controller = require("../controller/UserController");
const validate = require("../validators/UserValidation");
const noteValidate = require("../validators/NotesValidation")
const auth = require("../middleware/authentication");
const notesCon = require("../controller/NotesController");

//create router object
let router = express.Router();

//api's
router.post("/register", validate.signUp, controller.registerControl);
router.post("/login", validate.login, controller.loginControl);
router.post("/forgotpassword", validate.email, controller.forgotPasswordController);
router.patch("/resetpassword", auth, validate.confirmPassword, controller.resetPasswordController);

router.post("/addnotes", auth,noteValidate.note, notesCon.saveController);
router.get("/getnotes", auth, notesCon.getNotesController);
router.put("/update", auth,noteValidate.note, notesCon.updateController);
router.delete("/delete", auth, notesCon.deleteController);
router.get("/archived", auth, notesCon.archiveController);
router.get("/deleted", auth, notesCon.isDeletedController);

//export
module.exports = router;


  */
