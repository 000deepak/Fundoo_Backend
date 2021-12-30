//import
let express = require("express");
let controller = require("../controller/UserController");
const validate  = require("../validators/UserValidation");
const auth = require("../middleware/authentication")
const notesCon = require("../controller/NotesController");

//create router
let router = express.Router();//Creates a new router object.

//link router
router.post("/register",validate.signUp, controller.registerControl);
router.get("/login", validate.login,controller.loginControl);
router.get("/forgotpassword",  validate.email,controller.forgotPasswordController); 
router.get("/resetpassword",auth, controller.resetPasswordController); 
router.get("/get", controller.getController); 
//router.put("/crud/:id",controller.putController);
//router.delete("/crud/:id",controller.deleteController);

//Notes App link
router.post("/addNotes",auth, notesCon.saveController);
router.get("/getNotes", auth,notesCon.getNotesController);
router.post("/update", auth,notesCon.updateController);
router.post("/delete", auth,notesCon.deleteController);
router.get("/archived", auth,notesCon.archiveController);
router.get("/deleted", auth,notesCon.isDeletedController);


//export
module.exports = router;

