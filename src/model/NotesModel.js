/**
 * @purpose      To create reference for moongoose,develop schema and create model instance.
 * @module       model
 * @file         NotesModel.js
 * @author       deepak
 * @since        27/12/2021
 */

//import
const mongoose = require("mongoose");
const logger = require("../middleware/logger");

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    colour: {
      type: String,
    },
    isArchived: {
      type: Boolean,
    },
    isDeleted: {
      type: Boolean,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NotesDb = mongoose.model("Notes", NotesSchema);

class ModelClass {
  //find all notes based on query
  findNotes(req) {
    let response = {
      message: "",
      data: "",
      success: "",
      status: 200,
    };

    return new Promise((resolve, reject) => {
      NotesDb.find(req)
        .then((data) => {
          if (data.length > 0) {
            (response.success = true),
              (response.data = data),
              (response.status = 200),
              (response.message = "Notes Found");
            resolve(response);
          } else {
            (response.success = false),
              (response.data = data),
              (response.status = 404),
              (response.message = "Notes Not Found");
            resolve(response);
          }
        })
        .catch((err) => {
          logger.error("Error In Finding Notes", err);
          (response.success = false),
            (response.data = err),
            (response.status = 500),
            (response.message = "Error In Finding Notes");
          reject(response);
        });
    });
  }

  findOne(req) {
    var response = {
      message: "",
      data: "",
      success: "",
      status: 200,
    };
    return new Promise((resolve, reject) => {
      NotesDb
        .findOne(req)
        .then((data) => {
          if (data) {
            (response.success = true),
              (response.data = data),
              (response.status = 200),
              (response.message = "Notes found");
            resolve(response);
          } else {
            (response.success = false),
            (response.data = data),
            (response.status = 404),
            (response.message = "Notes Not Found");
          resolve(response);
          }
        })
        .catch((err) => {
          logger.error("Error In Finding Notes", err);
          (response.success = false),
            (response.data = err),
            (response.status = 500),
            (response.message = "Error In Finding Notes");
          reject(response);
        });
    });
  }

  //method to save notes to db
  saveModel(req) {
    let response = {
      success: true,
      message: "",
      data: "",
    };

    return new Promise((resolve, reject) => {
      req
        .save()
        .then((data) => {
          (response.success = true), (response.message = "Notes Saved");
          (response.data = data), (response.status = 201);
          resolve(response);
        })
        .catch((err) => {
          logger.error("error in saving notes", err);
          (response.success = false), (response.message = "Error In Saving Notes");
          (response.data = err), (response.status = 500);
          reject(response);
        });
    });
  }

  //update notes to db
  updateModel(req, newNote) {
    return new Promise((resolve, reject) => {
      var response = {
        success: false,
        message: "",
        data: "",
      };

      logger.info(req, newNote);
      NotesDb.updateOne(req, newNote, { new: true })
        .then((result) => {
          response.success = true;
          response.message = "Note Updated Successfully";
          response.data = result;
          response.status = 200;
          resolve(response);
        })
        .catch((err) => {
          logger.error("Error in updating notes", result);
          response.success = false;
          response.message = "Note Updation Failed";
          response.data = err;
          response.status = 500;
          reject(response);
        });

      //alternative method
      /*  NotesDb.findByIdAndUpdate({ _id: req.body.noteId }, newNote, {
        new: true,
      })
        .then((data) => {
          response.success = true;
          response.message = "Note Updated Successfully";
          response.data = data;
          response.status = 200;
          resolve(response);
        })
        .catch((err) => {
          response.success = false;
          response.message = err;
          reject(response);
        });  */
    });
  }

  //delete notes in db
  deleteModel(req) {
    return new Promise((resolve, reject) => {
      var response = {
        success: false,
        message: "",
        data: "",
      };

      NotesDb.deleteOne(req)
        .then((result) => {
          response.success = true;
          response.message = "Note Deleted Successfully";
          response.data = result;
          response.status = 200;
          resolve(response);
        })
        .catch((err) => {
          logger.error("Note Deletion Failed", result);
          response.success = false;
          response.status = 500;
          response.data = err;
          response.message = "Error in Deleting Notes";
          reject(response);
        });

      //alternative method
      /*NotesDb.findByIdAndDelete({ _id: req.body.noteId })
        .then((data) => {
          response.success = true;
          response.message = "Note deleted Successfully";
          response.data = data;
          response.status = 200;
          resolve(response);
        })
        .catch((err) => {
          response.success = false;
          response.message = err;
          reject(response);
        }); */
    });
  }
}

module.exports = { ModelClass, NotesDb };
