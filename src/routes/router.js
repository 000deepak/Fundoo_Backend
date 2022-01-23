/**
 * @purpose      To divert control to user or note routes when given path is hit.
 * @module       routes
 * @file         index.js
 * @author       deepak
 * @since        9/1/2022
 */

//import
let express = require("express");

//create router object
let router = express.Router();

let user =require("./userroutes");
let note =require("./noteroutes");

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get("/", (req, res) => {
    res.json("Welcome to Fundoo Notes application");
  });
  router.use("/users", user);
  router.use("/notes", note);

  return router;
};

module.exports=routes;
