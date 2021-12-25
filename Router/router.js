//import
let express = require("express");
let controller = require("../Controller/controller");
const notesCon = require("../NotesController/NotesController");

//create router
let router = express.Router();

//link router
router.post("/register", controller.registerControl);
router.post("/login", controller.loginControl);
router.get("/get", controller.getController); 
router.put("/crud/:id",controller.putController);
router.delete("/crud/:id",controller.deleteController);



//Notes App link
//router.post("/save", notesCon.saveController);
//router.get("/show", notesCon.getController);
//router.get("/show/title", notesCon.getController);


//export
module.exports = router;

//1.import controller
//2.create router
//3.link router
//4.export router
