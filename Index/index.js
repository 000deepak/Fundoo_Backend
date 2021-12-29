const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

//require(".env").config();
console.log(process.env.PORT);

//imports
let express = require("express");
let mongoose = require("mongoose");
let router = require("../Router/router");
var expressValidator = require('express-validator');


//create
let app = express();
app.use(expressValidator())

//using json
app.use(express.json());

//link Route
app.use("/", router);

//listen app
app.listen(process.env.PORT, () => {
  console.log("listening");
});

//connect moongoose to db
mongoose.connect(process.env.DB, (error) => {
  if (error) console.log("connection error");
  else console.log("connection succesfull");
});



// 1.import all files and libs
// 2.start nodejs => user express.json => link ROute => listen app
// 3.connect to db with mongoose
