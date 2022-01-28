/**
 * @purpose      forwarding and excecuting the requests
 * @module       controller
 * @file         NotesController.js
 * @author       deepak
 * @since        27/12/2021
 */


//import service reference
const service = require("../services/NotesService");
const logger = require('../middleware/logger')

class ControllerClass {
  //save the notes
  saveController(req, res) {
    service
      .saveService(req)
      .then((result) => {
        logger.info("save notes,successful ", result);
        res.status(result.status).json(result);
      })
      .catch((err) => {
        logger.error("save notes,failed", err);
        res.status(err.status).json(err);
      });
  }

  //get all notes
  getNotesController(req, res) {
    service
      .getNotesService(req)
      .then((result) => {
        logger.info("get notes success", result);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("get notes fail", err);
        res.status(err.status).json(err);
      });
  }

  //update user by id.
  updateController(req, res) {
    service
      .updateService(req)
      .then((result) => {
        logger.info("update note successs", result);
        res.status(result.status).json(result);
      })
      .catch((err) => {
        logger.error("update note failed", err);
        res.status(err.status).json(err);
      });
  }

  //Delete by Id
  deleteController(req, res) {
    service
      .deleteService(req)
      .then((result) => {
        logger.info("delete note successs", result);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("delete note ,failed", err);
        res.status(err.status).json(err);
      });
  }

  //is Archived
  archiveController(req, res) {
    service
      .archiveService(req)
      .then((result) => {
        logger.info("get archived notes,successs", result);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("get archived notes,failed", err);
        res.status(err.status).json(err);
      });
  }
  //is Deleted
  isDeletedController(req, res) {
    service
      .isDeletedService(req)
      .then((result) => {
        logger.info("get deleted notes", result);
        res.status(200).json(result);
      })
      .catch((err) => {
        logger.error("get deleted notes,failed", err);
        res.status(err.status).json(err);
      });
  }
}

//export
module.exports = new ControllerClass();
