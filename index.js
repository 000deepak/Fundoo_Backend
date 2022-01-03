const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
console.log(process.env.PORT);
const logger = require('./src/middleware/logger')

//imports
let express = require("express");
var expressValidator = require('express-validator');
let router = require("./src/routes/router");

//create
let app = express();
app.use(expressValidator());
app.use(express.json());

//link Route
app.use("/", router);

//listen app
app.listen(process.env.PORT, () => {
  logger.info(`listening at port ${process.env.PORT}`);
});

//connect moongoose to db
const dbConfig = require('./src/config/database.js');
dbConfig.connection();

module.exports = app;

