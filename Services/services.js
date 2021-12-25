//imports
const model = require("../Model/model");

//create
const modelInstance = new model.ModelClass();
//Here ModelClass is not exported as reference(object) but as class so again we have to create a object.
//we create new object of model class model instance to access its method(registerModel)

const userDb = model.User;
//we create userDb variable to store database details(Schema,name) to use further.
//we can access the db details by using pathVariable(here model).ExportedValue(here user)

class ServiceClass {
  //register user
  registerService(obj) {
    let newUser = new userDb({
      //extract data from object
      fName: obj.fName,
      lName: obj.lName,
      email: obj.email,
      password: obj.password,
    });

    let userSaved = modelInstance.registerModel(newUser); //pass data to model  and get status.
    return userSaved; //return status
  }

  //get all users
  getService(req) {
    return new Promise((resolve, reject) => {
      const result = userDb.find();
      resolve(result);
    });
  }

  //login service
  async loginService(req) {
    const user = await modelInstance.loginModel(req);
    const match = await bcrypt.compare(req.password, user.password);
    if (match) {
      console.log("logged in successfully");
    }
  }

  //put Service
  putService(req) {
    return new Promise((resolve, reject) => {
      //what we have to update
      console.log(req.params.id);
      const user = userDb.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      resolve(user);
    });
  }

  //Delete Service
  deleteService(req) {
    return new Promise((resolve, reject) => {
      console.log(req.params.id);
      
      userDb.findByIdAndDelete(req.params.id).then((result) => {
        console.log(result);
        resolve("user deleted");
      });
    });
  }
}

//exports
module.exports = new ServiceClass();
//here we are not exporting class but exporting its reference or object.
