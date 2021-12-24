"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//imports
var mongoose = require("mongoose"); //db Schema


var userSchema = new mongoose.Schema({
  fName: {
    type: String
  },
  lName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
}, {
  timestamps: true
});
var User = mongoose.model("FundooDb", userSchema); //exporting this user as shown at end  and create the same user using fileName.exportedUser(model.user)
//model class

var ModelClass =
/*#__PURE__*/
function () {
  function ModelClass() {
    _classCallCheck(this, ModelClass);
  }

  _createClass(ModelClass, [{
    key: "registerModel",
    value: function registerModel(req) {
      var response = {
        success: true,
        message: "",
        data: ""
      };
      return new Promise(function (resolve, reject) {
        req.save() //save data to db
        .then(function (data) {
          //return status and data
          response.success = true, response.message = "user registration SUCCESSFUL";
          response.data = data, response.status = 200;
          resolve({
            response: response
          });
        })["catch"](function (err) {
          response.success = false, response.message = "user registration FAILED";
          response.data = data, response.status = 200;
          reject({
            response: response
          });
        });
      });
    }
  }]);

  return ModelClass;
}(); //exports class with Schema & db names


module.exports = {
  ModelClass: ModelClass,
  User: User
};