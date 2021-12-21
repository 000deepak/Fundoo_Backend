"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//imports
var model = require("./model"); //create


var modelInstance = new model.ModelClass();
var userSchema = model.User;

var ServiceClass =
/*#__PURE__*/
function () {
  function ServiceClass() {
    _classCallCheck(this, ServiceClass);
  }

  _createClass(ServiceClass, [{
    key: "registerService",
    value: function registerService(obj) {
      var user = new userSchema({
        //extract data from object
        fName: obj.fName,
        lName: obj.lName,
        email: obj.email,
        password: obj.password
      });
      var userSaved = modelInstance.registerModel(user); //pass data to model  and get status

      return userSaved; //return status
    }
  }]);

  return ServiceClass;
}(); //exports


module.exports = new ServiceClass();