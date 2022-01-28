/**
 * @purpose      To eastablish connection with db when fn is called in index
 * @module       config
 * @file         database.js
 * @author       deepak 
 * @since        27/12/2021
 */

const mongoose = require("mongoose");
require("dotenv").config();

class DBconnection {
    connection = () => {
      mongoose.connect(process.env.DB, {
        useNewUrlParser: true
      }).then(() => {
        console.log(`Successfully connected to the database at port ${process.env.PORT}`);
      }).catch(err => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
      });
    }
}
module.exports = new DBconnection();