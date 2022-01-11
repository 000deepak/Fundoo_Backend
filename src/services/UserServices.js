//imports
const model = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../middleware/nodeMailer");

//create Db
const userModel = new model.ModelClass();
const userDb = model.userDb;

class ServiceClass {
  //Signup service
  async registerService(req) {
    let email = { email: req.body.email };

    let foundUser = await userModel.findUser(email);
    let len = foundUser.data.length;

    if (len == 0) {
      let hash = await bcrypt.hash(req.body.password, 8);

      let newUser = new userDb({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: hash,
      });

      let savedData = await userModel.registerModel(newUser);

      return savedData;
    } else {
      return foundUser;
    }
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

    return new Promise((resolve, reject) => {
      if (foundUser.data.length > 0) {
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

              (response.success = true), (response.message = "Login Successfull");
              (response.data = obj), (response.status = 200);
              resolve(response);
            } else {
              (response.success = false), (response.message = "Incorrect Password");
              (response.data = ""), (response.status = 401);
              reject(response);
            }
          })
          .catch((err) => {
            (response.success = false), (response.message = "Error In Checking Password");
            (response.data = err), (response.status = 500);
            reject(response);
          });
      } else {
        (response.success = false), (response.message = "User Not Found");
        (response.data = ""), (response.status = 404);
        reject(response);
      }
    });
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
      let token = jwt.sign({ email: foundUser.data[0].email, id: foundUser.data[0].id }, "secret");
      let address = "http://localhost:3000/resetpassword/";

      let link = address + token;

      looger.info("Sending email to ", foundUser.data[0].email);

      await nodemailer.sendEmail(foundUser.data[0].email, link);
      (response.success = true), (response.message = "Link sent to email Successfully");
      (response.data = ""), (response.status = 200);

      return response;
    } else {
      (response.success = false), (response.message = "User Not Found");
      (response.data = ""), (response.status = 200);
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
      logger.info("Resetting Password ", foundUser);

      let hash = await bcrypt.hash(req.body.confirmPassword, 8);

      let newPassword = { password: hash };

      let updatedUser = await userModel.updateModel(userId, newPassword);

      return updatedUser;
    } else {
      (response.success = false), (response.message = "User Not Found");
      (response.data = ""), (response.status = 200);
      return response;
    }
  }
}

//exports
module.exports = new ServiceClass();
