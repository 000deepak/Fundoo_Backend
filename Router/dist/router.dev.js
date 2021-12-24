"use strict";

//import
var express = require("express");

var controller = require("../Controller/controller"); //create router


var router = express.Router(); //link router

router.post("/register", controller.registerControl);
router.get("/login", controller.loginControl);
router.get("/register/get", controller.getController); //Notes App link

router.post("/save", notesCon.notesSave);
router.get("/show", notesCon.notesShow); //export

module.exports = router; //1.import controller
//2.create router
//3.link router
//4.export router