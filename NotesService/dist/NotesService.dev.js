"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import
var ModelImport = require("../NotesModel/NotesModel");

var model = new ModelImport.ModelClass();
var NotesDb = ModelImport.NotesSchemaExp;

var ServiceClass =
/*#__PURE__*/
function () {
  function ServiceClass() {
    _classCallCheck(this, ServiceClass);
  }

  _createClass(ServiceClass, [{
    key: "saveService",
    //save all notes
    value: function saveService(obj) {
      var note = new NotesDb({
        title: obj.title,
        description: obj.description,
        colour: obj.colour,
        isArchive: obj.isArchive,
        isDeleted: obj.isDeleted
      });
      var noteSaved = model.saveModel(note);
      return noteSaved;
    } //get all notes

  }, {
    key: "getService",
    value: function getService(req) {
      return new Promise(function (resolve, reject) {
        var result = NotesDb.find();
        resolve(result);
      });
    } //get by title 

  }, {
    key: "getByTitleService",
    value: function getByTitleService(req) {
      return new Promise(function (resolve, reject) {
        var result = NotesDb.findOne({
          title: req.title
        });
        resolve(result);
      });
    }
  }]);

  return ServiceClass;
}();

module.exports = new ServiceClass();