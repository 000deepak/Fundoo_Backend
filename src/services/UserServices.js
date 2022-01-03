//imports
const model = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../middleware/nodeMailer");

//create Db
const userModel = new model.ModelClass();
const userDb = model.userDb;

class ServiceClass {
  //register user
  async registerService(req) {
    let email = { email: req.body.email };
    let foundUser = await userModel.findUser(email);
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
  getService() {
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
    let email = { email: req.body.email };
    let foundUser = await userModel.findUser(email);
    console.log(foundUser);

    if (foundUser.data.length > 0) {
      return new Promise((resolve, reject) => {
        bcrypt
          .compare(req.body.password, foundUser.data[0].password)
          .then((result) => {
            if (result) {
              let token = jwt.sign(
                { email: foundUser.data[0].email, id: foundUser.data[0].id },
                "secret"
              );
              let obj = {
                fName: foundUser.data[0].fName,
                lName: foundUser.data[0].lName,
                userId: foundUser.data[0]._id,
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

  //forget password service
  async forgotPasswordService(req) {
    let response = {
      success: true,
      message: "",
      data: "",
    };
    let email = { email: req.body.email };
    let foundUser = await userModel.findUser(email);

    if (foundUser) {
      //jwt
      let token = jwt.sign(
        { email: foundUser.data[0].email, id: foundUser.data[0].id },
        "secret"
      );
      let address = "http://localhost:3000/resetpassword/";

      let link = address + token;

      console.log("Sending email to ", foundUser.data[0].email);

      let status = await nodemailer.sendEmail(foundUser.data[0].email, link);
      return status;
    } else {
      (response.success = false), (response.message = "User Not Found");
      (response.data = ""), (response.status = 400);
      return response;
    }
  }

  //reset password service
  async resetPasswordService(req) {
    let response = {
      success: true,
      message: "",
      data: "",
    };

    let userId = { _id: req.body.data.id };
    let foundUser = await userModel.findUser(userId);

    if (foundUser) {
      console.log("Resetting Password ", foundUser);

      let hash = await bcrypt.hash(req.body.confirmPassword, 8);

      let newPassword = { password: hash };

      let updatedUser = await userModel.updateModel(userId, newPassword);

      return updatedUser;
    } else {
      (response.success = false), (response.message = "User Not Found");
      (response.data = ""), (response.status = 400);
      return response;
    }
  }

  //put Service
  putService(req) {
    return new Promise((resolve, reject) => {
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
