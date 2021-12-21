"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//imports
var mongoose = require("mongoose");

var bcrypt = require("bcrypt"); //hashing password extension
//db Schema


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
}); //hashing password and storing in db

userSchema.pre("save", function (next) {
  var _this = this;

  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, function (err, hash) {
      if (err) return next(err);
      _this.password = hash;
      next();
    });
  }
}); //comparing given passwords and from db

userSchema.methods.comparePassword = function _callee(password) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (password) {
            _context.next = 2;
            break;
          }

          throw new Error("password missing");

        case 2:
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(bcrypt.compare(password, this.password));

        case 5:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          console.log("error while comparing password", _context.t0.message);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, this, [[2, 9]]);
};

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
          //return status
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