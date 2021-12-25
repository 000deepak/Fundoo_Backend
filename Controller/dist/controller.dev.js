"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//imports
var service = require("../Services/services"); //control class


var RegisterClass =
/*#__PURE__*/
function () {
  function RegisterClass() {
    _classCallCheck(this, RegisterClass);
  }

  _createClass(RegisterClass, [{
    key: "registerControl",
    value: function registerControl(req, res) {
      service.registerService(req.body).then(function (result) {
        console.log("inside controller ,successful ", result);
      })["catch"](function (err) {
        console.log("inside controller ,failed", err);
      });
    } //get all users

  }, {
    key: "getController",
    value: function getController(req, res) {
      service.getService(req).then(function (result) {
        console.log(result);
      })["catch"](function (err) {
        console.log("inside controller ,failed", err);
      });
    } //get user by id

  }, {
    key: "loginControl",
    value: function loginControl(req, res) {
      service.loginService(req.body);
    } //put(update) we have to provide all the details of user to update if it is not present then it creates it.

  }, {
    key: "putController",
    value: function putController(req, res) {
      console.log(req.body);
      service.putService(req).then(function (result) {
        console.log(result);
      });
    } //patch ,patch is related to location ,so just provide id and update

  }]);

  return RegisterClass;
}(); //exports


module.exports = new RegisterClass(); //1.import service
//2.forwading operation
//3.export controller