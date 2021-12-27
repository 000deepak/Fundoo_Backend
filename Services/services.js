//imports
const model = require("../Model/model");


//create
const userModel = new model.ModelClass();
//Here ModelClass is not exported as reference(object) but as class so again we have to create a object.
//we create new object of model class model instance to access its method(registerModel)

const userDb = model.userDb;
//we create userDb variable to store database details(Schema,name) to use further.
//we can access the db details by using pathVariable(here model).ExportedValue(here user)

class ServiceClass {
  //register user
  async registerService(req) {
    let foundUser = await userModel.findUser(req.body);
    let len = foundUser.data.length;

    if (len == 0) {
      let newUser = new userDb({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: req.body.password,
      });

      let hash = await bcrypt.hash(newUser.password, 8);
      newUser.password = hash;
      let savedData = await userModel.registerModel(newUser);

      return savedData;
    } else {
      return foundUser;
    }
  }

  //get all users
  getService(req) {
    return new Promise((resolve, reject) => {
      const result = userDb.find();
      resolve(result);
    });
  }

  //login service
  loginService(req) {
    return new Promise((resolve, reject) => {
      userModel.loginModel(req).then((response) => {
        resolve(response);
      });
    });
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
