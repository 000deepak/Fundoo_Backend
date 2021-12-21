//imports
const model = require("./model");

//create
const modelInstance = new model.ModelClass();
const userSchema = model.User;

class ServiceClass {
  registerService(obj) {
    let user = new userSchema({
      //extract data from object
      fName: obj.fName,
      lName: obj.lName,
      email: obj.email,
      password: obj.password,
    });

    let userSaved = modelInstance.registerModel(user); //pass data to model  and get status
    return userSaved; //return status
  }
}

//exports
module.exports = new ServiceClass();
