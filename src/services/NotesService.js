/**
 * @purpose      To make logical operations and query the db
 * @module       service
 * @file         NotesService.js
 * @author       deepak
 * @since        27/12/2021
 */

//import
const ModelImport = require("../model/NotesModel");
const notesModel = new ModelImport.ModelClass();
const NotesDb = ModelImport.NotesDb;

class ServiceClass {
  //save all notes
  async saveService(req) {
    let note = new NotesDb({
      title: req.body.title,
      description: req.body.description,
      colour: req.body.colour,
      isArchived: req.body.isArchived,
      isDeleted: req.body.isDeleted,
      userId: req.body.data.id,
    });

    let noteSaved = await notesModel.saveModel(note);
    return noteSaved;
  }

  //get notes
  async getNotesService(req) {
    let query = { userId: req.body.data.id };
    let notesFound = await notesModel.findNotes(query);
    return notesFound;
  }

  //update notes
  async updateService(req) {
    let response = {
      message: "",
      success: "",
      data: "",
    };
    let query = { _id: req.body.noteId };

    let oldNote = await notesModel.findNotes(query);

    if (oldNote.data.length > 0) {
      var newNote = {
        title: req.body.title ? req.body.title : oldNote.data.title,
        description: req.body.description ? req.body.description : oldNote.data.description,
        isArchived: req.body.isArchived ? req.body.isArchived : false,
        isDeleted: req.body.isDeleted ? req.body.isDeleted : false,
        color: req.body.color ? req.body.color : oldNote.data.color,
        userId: req.body.data.id,
      };

      let data = await notesModel.updateModel(query, newNote);

      return data;
    } else {
      (response.success = false), (response.message = "Note Not Found"), (response.status = 404);
      return response;
    }
  }

  //delete notes
  async deleteService(req) {
    let response = {
      message: "",
      success: "",
      data: "",
    };
    let query = { _id: req.body.noteId };

    let oldNote = await notesModel.findNotes(query);

    if (oldNote.data.length > 0) {

      let notesDeleted = await notesModel.deleteModel(query);
      return notesDeleted;
    } else {
      (response.success = false), (response.message = "Note Not Found"), (response.status = 404);
      return response;
    }
  }

  //archived notes
  async archiveService(req) {
    let query = { userId: req.body.data.id, isArchived: true };
    let notesArchived = await notesModel.findNotes(query);
    return notesArchived;
  }

  //deleted notes
  async isDeletedService(req) {
    let query = { userId: req.body.data.id, isDeleted: true };
    let notesDeleted = await notesModel.findNotes(query);
    return notesDeleted;
  }
}

module.exports = new ServiceClass();
