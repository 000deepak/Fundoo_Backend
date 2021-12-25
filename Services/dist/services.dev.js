"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//imports
var model = require("../Model/model"); //create


var modelInstance = new model.ModelClass(); //Here ModelClass is not exported as reference(object) but as class so again we have to create a object.
//we create new object of model class model instance to access its method(registerModel)

var userDb = model.User; //we create userDb variable to store database details(Schema,name) to use further.
//we can access the db details by using pathVariable(here model).ExportedValue(here user)

var ServiceClass =
/*#__PURE__*/
function () {
  function ServiceClass() {
    _classCallCheck(this, ServiceClass);
  }

  _createClass(ServiceClass, [{
    key: "registerService",
    //register user
    value: function registerService(obj) {
      var newUser = new userDb({
        //extract data from object
        fName: obj.fName,
        lName: obj.lName,
        email: obj.email,
        password: obj.password
      });
      var userSaved = modelInstance.registerModel(newUser); //pass data to model  and get status.

      return userSaved; //return status
    } //get all users

  }, {
    key: "getService",
    value: function getService(req) {
      return new Promise(function (resolve, reject) {
        var result = userDb.find();
        resolve(result);
      });
    } //login service

  }, {
    key: "loginService",
    value: function loginService(req) {
      var user, match;
      return regeneratorRuntime.async(function loginService$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(modelInstance.loginModel(req));

            case 2:
              user = _context.sent;
              _context.next = 5;
              return regeneratorRuntime.awrap(bcrypt.compare(req.password, user.password));

            case 5:
              match = _context.sent;

              if (match) {
                console.log("logged in successfully");
              }

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    } //put Service

  }, {
    key: "putService",
    value: function putService(req) {
      return new Promise(function (resolve, reject) {
        //what we have to update
        var user = userDb.findOne({
          fName: req.body.fName
        });
        console.log(user);
        var lName = userDb({
          lName: req.body.lName
        });
        lName.save();
        resolve("data updated successfully using put");
      });
    } //put Service

    /*     putService(req) {
        return new Promise((resolve, reject) => {
          const toUpdate = req.body;                 //what we have to update
          userDb.findById(id, (err, data) => {
            if (err) throw err;
            data = toUpdate? toUpdate: data;
            //req lName is present then it is updated if not then it is reassigned its old value only
            data.save((err, res) => {
              if (err) throw err;
              resolve("data updated successfully using put");
            });
          });
        });
      } */

  }]);

  return ServiceClass;
}(); //exports


module.exports = new ServiceClass(); //here we are not exporting class but exporting its reference or object.