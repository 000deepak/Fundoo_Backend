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
router.put("/update", auth, notesCon.updateController);
router.delete("/delete", auth, notesCon.deleteController);
router.get("/archived", auth, notesCon.archiveController);
router.get("/deleted", auth, notesCon.isDeletedController);

//export
module.exports = router;
