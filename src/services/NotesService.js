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
    let query = { userId: req.body.data.id }
    let notesFound = await notesModel.findNotes(query);
    return notesFound;
  }

  //update notes
  async updateService(req) {
    console.log(" inside update service", req.body.data.id);

    let response = {
      message: "",
      success: "",
      data: "",
    };

    let query = { id: req.body.noteId };

    let oldNote = await notesModel.findNotes(query);

    if (oldNote) {
      let data = await notesModel.updateModel(req, oldNote);

      return data;
    } else {
      (response.success = false),
        (response.message = "plase provide note id "),
        (response.status = 500),
        (response.data = card);
      return { response };
    }
  }

  //delete notes
  async deleteService(req) {
    let notesDeleted = await notesModel.deleteModel(req);
    return notesDeleted;
  }

  //archived notes
  async archiveService(req) {
    let query = {userId: req.body.data.id,isArchived: true,}
    let notesArchived = await notesModel.findNotes(query);
    return notesArchived;
  }

  //deleted notes
  async isDeletedService(req) {
    let query = {userId: req.body.data.id,isDeleted: true,}
    let notesDeleted = await notesModel.findNotes(query);
    return notesDeleted;
  }
}

module.exports = new ServiceClass();
