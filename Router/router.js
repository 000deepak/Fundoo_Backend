//import

let express = require('express');
let controller = require('./controller');

//create router
let router = express.Router();


//link router
router.post('/register',controller.registerControl)

//export
module.exports=router;

