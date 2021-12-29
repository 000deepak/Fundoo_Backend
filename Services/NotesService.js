//import
const ModelImport = require("../Model/NotesModel");
const notesModel = new ModelImport.ModelClass();
const NotesDb = ModelImport.NotesDb;

class ServiceClass {
  //save all notes
  async saveService(req) {
    let note = new NotesDb({
      title: req.body.title,
      description: req.body.description,
      colour: req.body.colour,
      isArchive: req.body.isArchive,
      isDeleted: req.body.isDeleted,
      userId: req.body.data.id,   //userid
    });

    let noteSaved = await notesModel.saveModel(note);
    return noteSaved;
  }

  //get notes
  async getByTitleService(req) {
    let notesFound = await notesModel.findNotes(req);
    return notesFound;
  }

  //update notes
  async updateService(req) {
    console.log(" inside update service", req.body.data.id);

    // return data;
    let response = {
      message: "",
      success: "",
      data: "",
    };

    // noteid
    let oldNote = await notesModel.findNote(req);

    if (oldNote) {
      console.log(" data after find ", oldNote);
      console.log(" req in service update ", req);

    /*   var newNote = {
        title: req.body.title ? req.body.title : oldNote.title,
        description: req.body.description? req.body.description: oldNote.description,
        isArchived: req.body.isArchived ? req.body.isArchived : false,
        isDeleted: req.body.isDeleted ? req.body.isDeleted : false,
        color: req.body.color ? req.body.color : oldNote.color,
        userId: req.body.data.id,
      }; */

      let data = await notesModel.updateModel(req, oldNote);
      //console.log(" after update service notes ^&&^&^&^&^&", data);

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
}

module.exports = new ServiceClass();
