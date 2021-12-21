"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//imports
var service = require("./services"); //control class


var RegisterClass =
/*#__PURE__*/
function () {
  function RegisterClass() {
    _classCallCheck(this, RegisterClass);
  }

  _createClass(RegisterClass, [{
    key: "registerControl",
    value: function registerControl(req, res) {
      service.registerService(req.body) //pass data to service
      .then(function (result) {
        console.log("inside successful ", result);
      })["catch"](function (err) {
        console.log("failed", err);
      });
    }
  }]);

  return RegisterClass;
}(); //exports


module.exports = new RegisterClass();