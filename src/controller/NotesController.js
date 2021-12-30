//import service reference
const service = require("../services/NotesService");

class ControllerClass {
  //save the notes
  saveController(req, res) {
    if (req.body.title) {
      service
        .saveService(req)
        .then((result) => {
          console.log("inside controller ,successful ", result);
          res.send(JSON.stringify(result));
        })
        .catch((err) => {
          console.log("inside controller ,error", err);
          res.send(JSON.stringify(err));
        });
    } else {
      res.send("body cannot be empty");
    }
  }

  //get all notes
  getNotesController(req, res) {
    service
      .getNotesService(req)
      .then((result) => {
        console.log("insideget notes", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        console.log("inside controller ,failed", err);
        res.send(JSON.stringify(err));
      });
  }

  //update user by id.
  updateController(req, res) {
    service
      .updateService(req)
      .then((result) => {
        console.log("inside controller successs", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        console.log("inside controller ,failed", err);
        res.send(JSON.stringify(err));
      });
  }

  //Delete by Id
  deleteController(req, res) {
    service
      .deleteService(req)
      .then((result) => {
        console.log("inside controller successs", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        console.log("inside controller ,failed", err);
        res.send(JSON.stringify(err));
      });
  }

  //is Archived
  archiveController(req, res) {
    service
      .archiveService(req)
      .then((result) => {
        //console.log("inside controller successs", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        //console.log("inside controller ,failed", err);
        res.send(JSON.stringify(err));
      });
  }
  //is Deleted
  isDeletedController(req, res) {
    service
      .isDeletedService(req)
      .then((result) => {
        //console.log("inside controller successs", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        //console.log("inside controller ,failed", err);
        res.send(JSON.stringify(err));
      });
  }
}

//export
module.exports = new ControllerClass();
