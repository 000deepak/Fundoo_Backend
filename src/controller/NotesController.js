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
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("inside controller ,error", err);
        res.status(err.status).json(result);
      });
  }

  //get all notes
  getNotesController(req, res) {
    service
      .getNotesService(req)
      .then((result) => {
        logger.info("save notes controller ", result);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("inside controller ,failed", err);
        res.status(err.status).json(result);
      });
  }

  //update user by id.
  updateController(req, res) {
    service
      .updateService(req)
      .then((result) => {
        logger.info("inside controller successs", result);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("inside controller ,failed", err);
        res.status(err.status).json(result);
      });
  }

  //Delete by Id
  deleteController(req, res) {
    service
      .deleteService(req)
      .then((result) => {
        logger.info("inside controller successs", result);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("inside controller ,failed", err);
        res.status(err.status).json(result);
      });
  }

  //is Archived
  archiveController(req, res) {
    service
      .archiveService(req)
      .then((result) => {
        logger.info("inside controller successs", result);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("inside controller ,failed", err);
        res.status(err.status).json(result);
      });
  }
  //is Deleted
  isDeletedController(req, res) {
    service
      .isDeletedService(req)
      .then((result) => {
        logger.info("inside controller successs", result);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("inside controller ,failed", err);
        res.status(err.status).json(result);
      });
  }
}

//export
module.exports = new ControllerClass();
