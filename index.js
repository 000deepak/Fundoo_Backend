/**
 * @purpose      To develop an apis for Fundoo notes application
 * @module       index
 * @description  creating app,mount middleware and establish db connection
 * @author       deepak
 * @version      1.0
 * @since        27/12/2022
 *
 */

//import .env
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

//import express
let express = require("express");

//import middleware
const logger = require("./src/middleware/logger");
var expressValidator = require("express-validator");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/swagger/swagger.json");
const cors = require("cors");

let router = require("./src/routes/router");

//create app
let app = express();
app.use(expressValidator());
app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//link Router
app.use("/", router());

//bind app to port
app.listen(process.env.PORT, () => {
  logger.info(`listening at port ${process.env.PORT}`);
});

//connect moongoose to db
const dbConfig = require("./src/config/database.js");
dbConfig.connection();

//export app
module.exports = app;
