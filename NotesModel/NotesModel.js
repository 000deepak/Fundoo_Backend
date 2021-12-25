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
  },
  {
    timestamps: true,
  }
);

const NotesSchemaExp = mongoose.model("NotesApp", NotesSchema);

class ModelClass {
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
          (response.success = true),
            (response.message = "notes saved");
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
}
module.exports = { ModelClass, NotesSchemaExp };
