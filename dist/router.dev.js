"use strict";

//import
var express = require('express');

var controller = require('./controller'); //create router


var router = express.Router(); //link router

router.post('/register', controller.registerControl); //export

module.exports = router;