//import
const ModelImport = require("../NotesModel/NotesModel");
const model = new ModelImport.ModelClass();
const NotesDb = ModelImport.NotesSchemaExp;

class ServiceClass {

  //save all notes
  saveService(obj) {
    let note = new NotesDb({
      title: obj.title,
      description: obj.description,
      colour: obj.colour,
      isArchive: obj.isArchive,
      isDeleted: obj.isDeleted, 
    });

    let noteSaved = model.saveModel(note);
    return noteSaved;
  }

    //get all notes
    getService(req) {
      return new Promise((resolve, reject) => {
        const result = NotesDb.find();
        resolve(result);
      });
    }

    //get by title 
    getByTitleService(req) {
      return new Promise((resolve, reject) => {
        const result = NotesDb.findOne({ title: req.title });
        resolve(result);
      });
    }




}

module.exports = new ServiceClass();
