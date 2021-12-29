//import service reference
const service = require("../Services/NotesService");

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
          res.send(err);
        });
    } else {
      res.send("body cannot be empty");
    }
  }

  //get all notes
  getByTitleController(req, res) {
    service
      .getByTitleService(req)
      .then((result) => {
        console.log("insideget notes", result);
        res.send(result);
      })
      .catch((err) => {
        console.log("inside controller ,failed", err);
        res.send(err);
        res.send(err);
      });
  }

  //update user by id.
  updateController(req, res) {
    service
      .updateService(req)
      .then((result) => {
        console.log("inside controller successs", result);
        res.send(result);
      })
      .catch((err) => {
        console.log("inside controller ,failed", err);
        res.send(err);
      });
  }

  //Delete by Id
  deleteController(req, res) {
    service
      .deleteService(req)
      .then((result) => {
        console.log("inside controller successs", result);
        res.send(result);
      })
      .catch((err) => {
        console.log("inside controller ,failed", err);
        res.send(err);
      });
  }
}

//export
module.exports = new ControllerClass();
