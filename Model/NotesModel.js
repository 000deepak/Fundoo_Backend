//import
const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    colour: {
      type: String,
    },
    isArchived: {
      type: String,
    },
    isDeleted: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const NotesDb = mongoose.model("Notes", NotesSchema);

class ModelClass {
  findNotes(req) {
    let response = {
      message: "",
      data: "",
      success: "",
      status: 200,
    };

    return new Promise((resolve, reject) => {
      NotesDb.find({ userId: req.body.data.id })
        .then((data) => {
          if (data.length > 0) {
            (response.success = true),
              (response.data = data),
              (response.status = 200),
              (response.message = "notes  exists");
            resolve(response);
          } else {
            resolve({
              message: "Notes not found ",
              data: [],
              status: 200,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          reject({ success: false, error: err });
        });
    });
  }

  findNote(req) {
    //console.log("req in find note", req.body.userId);

    return new Promise((resolve, reject) => {
      NotesDb.find({ id: req.body.noteId })
        .then((data) => {
          //console.log("request", data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  saveModel(req) {
    let response = {
      success: true,
      message: "",
      data: "",
    };

    return new Promise((resolve, reject) => {
      req
        .save() //save data to db
        .then((data) => {
          //return status and data
          (response.success = true), (response.message = "notes saved");
          (response.data = data), (response.status = 200);
          resolve({ response });
        })
        .catch((err) => {
          (response.success = false),
            (response.message = "notes are not saved");
          (response.data = data), (response.status = 200);
          reject({ response });
        });
    });
  }

  updateModel(req, oldNote) {
    //console.log(" inside update model", req, newNote);

    return new Promise((resolve, reject) => {
      var response = {
        success: false,
        message: "",
        data: "",
      };

         var newNote = {
        title: req.body.title ? req.body.title : oldNote.title,
        description: req.body.description? req.body.description: oldNote.description,
        isArchived: req.body.isArchived ? req.body.isArchived : false,
        isDeleted: req.body.isDeleted ? req.body.isDeleted : false,
        color: req.body.color ? req.body.color : oldNote.color,
        userId: req.body.data.id,
      }; 

      console.log();

      NotesDb.updateOne({ _id: req.body.noteId }, newNote, { new: true })
        .then((result) => {
          console.log(" updted successfully", result);

          response.success = true;
          response.message = "Note Updated Successfully";
          response.data = result;
          response.status = 200;
          resolve(response);
        })
        .catch((err) => {
          response.success = false;
          response.message = err;
          reject(response);
        });
      // Notes.findByIdAndUpdate(req.noteId, { $set: noteModel }).then((update) => {
      //     response.success = true;
      //     response.message = "Note Updated Successfully";
      //     response.data = data;
      //     response.status = 200
      //     resolve(response)
      // }).catch((err) => {
      //     response.success = false;
      //     response.message = err;
      //     reject(response)
      // })
    });
  }

  deleteModel(req, newNote) {
    console.log(" req in model ererere*&*&&*&*&*&*&*&*&*", req, newNote);

    return new Promise((resolve, reject) => {
      var response = {
        success: false,
        message: "",
        data: "",
      };

      NotesDb.deleteOne({_id: req.body.noteId})
        .then((result) => {
          console.log(" Deletedsuccessfully", result);

          response.success = true;
          response.message = "Note Deleted Successfully";
          response.data = result;
          response.status = 200;
          resolve(response);
        })
        .catch((err) => {
          response.success = false;
          response.message = err;
          reject(response);
        });
      // Notes.findByIdAndUpdate(req.noteId, { $set: noteModel }).then((update) => {
      //     response.success = true;
      //     response.message = "Note Updated Successfully";
      //     response.data = data;
      //     response.status = 200
      //     resolve(response)
      // }).catch((err) => {
      //     response.success = false;
      //     response.message = err;
      //     reject(response)
      // })
    });
  }
}

module.exports = { ModelClass, NotesDb };
