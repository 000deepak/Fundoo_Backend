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
    }
  }]);

  return ServiceClass;
}(); //exports


module.exports = new ServiceClass(); //here we are not exporting class but exporting its reference or object.