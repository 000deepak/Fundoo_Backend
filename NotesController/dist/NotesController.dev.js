"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import service reference
var service = require("../NotesService/NotesService");

var ControllerClass =
/*#__PURE__*/
function () {
  function ControllerClass() {
    _classCallCheck(this, ControllerClass);
  }

  _createClass(ControllerClass, [{
    key: "saveController",
    //save the notes
    value: function saveController(req, res) {
      service.saveService(req.body).then(function (result) {
        console.log("inside controller ,successful ", result);
      })["catch"](function (err) {
        console.log("inside controller ,error", err);
      });
    } //get all notes

  }, {
    key: "getController",
    value: function getController(req, res) {
      service.getService(req).then(function (result) {
        console.log("inside controller successs", result);
      })["catch"](function (err) {
        console.log("inside controller ,failed", err);
      });
    } //get by titile

  }, {
    key: "getByTitle",
    value: function getByTitle(req, res) {
      service.getByTitleService(req.body).then(function (result) {
        console.log(result);
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }]);

  return ControllerClass;
}(); //export


module.exports = new ControllerClass();