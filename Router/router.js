//import
let express = require("express");
let controller = require("../Controller/UserController");
const { validate } = require("../middleWare/UserValidation");
const auth = require("../Authentication/authentication")
const notesCon = require("../Controller/NotesController");

//create router
let router = express.Router();

//link router
router.post("/register",validate, controller.registerControl);
router.get("/login", controller.loginControl);

router.get("/get", controller.getController); 
router.put("/crud/:id",controller.putController);
router.delete("/crud/:id",controller.deleteController);



//Notes App link
router.post("/addNotes",auth, notesCon.saveController);
router.get("/getNotes", auth,notesCon.getByTitleController);

router.post("/show/:id", auth,notesCon.getByTitleController);
//router.get("/show/title",auth, notesCon.getController);
router.post("/update", auth,notesCon.updateController);
router.post("/delete", auth,notesCon.deleteController);


//export
module.exports = router;

//1.import controller
//2.create router
//3.link router
//4.export router
