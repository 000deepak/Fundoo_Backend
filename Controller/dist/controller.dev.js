"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//imports
var service = require("../Services/services"); //service class is exported as reference(object) so we can use it directly to access methods.
//control class


var RegisterClass =
/*#__PURE__*/
function () {
  function RegisterClass() {
    _classCallCheck(this, RegisterClass);
  }

  _createClass(RegisterClass, [{
    key: "registerControl",
    value: function registerControl(req, res) {
      //when "/register" is hit this method is called and "req"(data) is passesd.
      service.registerService(req.body).then(function (result) {
        //then is run after returning promise.
        console.log("inside controller ,successful ", result);
      })["catch"](function (err) {
        //catch is run if we get error for promise return
        console.log("inside controller ,failed", err);
      });
    }
  }, {
    key: "getController",
    value: function getController(req, res) {
      service.getService(req).then(function (result) {
        console.log(result);
      })["catch"](function (err) {
        console.log("inside controller ,failed", err);
      });
    }
  }]);

  return RegisterClass;
}(); //exports


module.exports = new RegisterClass(); //1.import service
//2.