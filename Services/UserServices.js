//imports
const model = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

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
  async loginService(req) {
    let response = {
      success: true,
      message: "",
      data: "",
    };
    let foundUser = await userModel.findUser(req.body);
    ///console.log(foundUser)

    if (foundUser.data.length > 0) {
      return new Promise((resolve, reject) => {
        console.log( foundUser.data[0].email,foundUser.data[0].id , "tttttttttjjkj");
        bcrypt
          .compare(req.body.password, foundUser.data[0].password)
          .then((result) => {
            if (result) {
              let token = jwt.sign(
                { email: foundUser.data[0].email,id:foundUser.data[0].id },
                "secret"
              );
              let obj = {
                fName: foundUser.data[0].fName,
                lName: foundUser.data[0].lName,
                userId:foundUser.data[0]._id,
                email: foundUser.data[0].email,
                token: token,
              };

              (response.success = true),
                (response.message = "logged in successfull");
              (response.data = obj), (response.status = 200);
              resolve(response);
            } else {
              (response.success = false),
                (response.message = "Invalid Password,Please try again");
              (response.data = ""), (response.status = 400);
              resolve(response);
            }
          })
          .catch((err) => {
            console.log(err, "inside proise");
            (response.success = false),
              (response.message = "Invalid Password,Please try again");
            (response.data = ""), (response.status = 400);
            resolve(response);
          });
      });
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
//npm install -g express-api-cli
//exp-api create projectname
