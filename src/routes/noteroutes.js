//import
let express = require("express");
const noteValidate = require("../validators/NotesValidation")
const auth = require("../middleware/authentication");
const notesCon = require("../controller/NotesController");

//create router object
let router = express.Router();

router.post("/notes", auth,noteValidate.note, notesCon.saveController);
router.get("/notes", auth, notesCon.getNotesController);
router.put("/update", auth,noteValidate.note, notesCon.updateController);
router.delete("/delete", auth, notesCon.deleteController);
router.get("/archived", auth, notesCon.archiveController);
router.get("/deleted", auth, notesCon.isDeletedController);

module.exports=router;