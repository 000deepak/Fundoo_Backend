//import
let express = require("express");
let controller = require("../controller/UserController");
const validate  = require("../validators/UserValidation");
const auth = require("../middleware/authentication")
const notesCon = require("../controller/NotesController");

//create router object
let router = express.Router();

//link router
router.post("/register",validate.signUp, controller.registerControl);
router.get("/login", validate.login,controller.loginControl);
router.post("/forgotpassword",  validate.email,controller.forgotPasswordController); 
router.post("/resetpassword",auth, controller.resetPasswordController); 
router.get("/get", controller.getController); 

//Notes App link
router.post("/addnotes",auth, notesCon.saveController);
router.get("/getnotes", auth,notesCon.getNotesController);
router.post("/update", auth,notesCon.updateController);
router.post("/delete", auth,notesCon.deleteController);
router.get("/archived", auth,notesCon.archiveController);
router.get("/deleted", auth,notesCon.isDeletedController);


//export
module.exports = router;

