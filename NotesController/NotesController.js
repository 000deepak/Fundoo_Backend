//import service reference
const service = require("../NotesService/NotesService");


class ControllerClass {
  //save the notes
  saveController(req, res) {
    service
      .saveService(req.body)
      .then((result) => {
        console.log("inside controller ,successful ", result);
      })
      .catch((err) => {
        console.log("inside controller ,error", err);
      });
  }
  //get all notes
  getController(req, res) {
    service
      .getService(req)
      .then((result) => {
        console.log("inside controller successs", result);
      })
      .catch((err) => {
        console.log("inside controller ,failed", err);
      });
  }

  //get by titile
  getByTitle(req, res) {
    service
      .getByTitleService(req.body)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//export
module.exports = new ControllerClass();
