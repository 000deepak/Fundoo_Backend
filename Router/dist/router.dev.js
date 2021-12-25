"use strict";

//import
var express = require("express");

var controller = require("../Controller/controller");

var notesCon = require("../NotesController/NotesController"); //create router


var router = express.Router(); //link router
//router.post("/register", controller.registerControl);
//router.get("/login", controller.loginControl);
//router.get("/register/get", controller.getController); 

router.put("/put", controller.putController); //Notes App link
//router.post("/save", notesCon.saveController);
//router.get("/show", notesCon.getController);
//router.get("/show/title", notesCon.getController);
//export

module.exports = router; //1.import controller
//2.create router
//3.link router
//4.export router