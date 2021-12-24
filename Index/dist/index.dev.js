"use strict";

//imports
var express = require("express");

var mongoose = require("mongoose");

var router = require("../Router/router"); //create


var app = express(); //using json

app.use(express.json()); //link Route

app.use("/", router); //listen app

app.listen(2000, function () {
  console.log("listening");
}); //connect moongoose to db

mongoose.connect("mongodb://localhost:27017/NotesApp", function (error) {
  if (error) console.log("connection error");else console.log("connection succesfull");
}); // 1.import all files and libs
// 2.start nodejs => user express.json => link ROute => listen app
// 3.connect to db with mongoose