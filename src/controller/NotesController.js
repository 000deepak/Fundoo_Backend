//import service reference
const service = require("../services/NotesService");
const logger = require('../middleware/logger')

class ControllerClass {
  //save the notes
  saveController(req, res) {
    service
      .saveService(req)
      .then((result) => {
        logger.info("inside controller ,successful ", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        logger.err("inside controller ,error", err);
        res.send(JSON.stringify(err));
      });
  }

  //get all notes
  getNotesController(req, res) {
    service
      .getNotesService(req)
      .then((result) => {
        logger.info("insideget notes", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        logger.err("inside controller ,failed", err);
        res.send(JSON.stringify(err));
      });
  }

  //update user by id.
  updateController(req, res) {
    service
      .updateService(req)
      .then((result) => {
        logger.info("inside controller successs", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        logger.err("inside controller ,failed", err);
        res.send(JSON.stringify(err));
      });
  }

  //Delete by Id
  deleteController(req, res) {
    service
      .deleteService(req)
      .then((result) => {
        logger.info("inside controller successs", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        logger.err("inside controller ,failed", err);
        res.send(JSON.stringify(err));
      });
  }

  //is Archived
  archiveController(req, res) {
    service
      .archiveService(req)
      .then((result) => {
        logger.info("inside controller successs", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        logger.err("inside controller ,failed", err);
        res.send(JSON.stringify(err));
      });
  }
  //is Deleted
  isDeletedController(req, res) {
    service
      .isDeletedService(req)
      .then((result) => {
        logger.info("inside controller successs", result);
        res.send(JSON.stringify(result));
      })
      .catch((err) => {
        logger.err("inside controller ,failed", err);
        res.send(JSON.stringify(err));
      });
  }
}

//export
module.exports = new ControllerClass();
