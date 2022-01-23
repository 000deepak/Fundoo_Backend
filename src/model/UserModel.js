/**
 * @purpose      To create reference for moongoose,develop schema and create model instance.
 * @module       model
 * @file         UserModel.js
 * @author       deepak 
 * @since        9/1/2022
 */

//imports
const mongoose = require("mongoose");
const logger = require("../middleware/logger");

//db Schema
const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    lName: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const userDb = mongoose.model("Users", userSchema);

//model class
class ModelClass {
  //method to find user
  findUser(req) {
    let response = {
      message: "",
      data: "",
      success: "",
      status: 200,
    };
    return new Promise((resolve, reject) => {
      userDb
        .find(req)
        .then((data) => {
          if (data.length > 0) {
            (response.success = true),
              (response.data = data),
              (response.status = 200),
              (response.message = "User  Found");
            resolve(response);
          } else {
            resolve({
              message: "User Not Found",
              data: data,
              status: 404,
            });
          }
        })
        .catch((err) => {
          logger.err("inside model err ", err);
          (response.success = false),
            (response.data = err),
            (response.status = 500),
            (response.message = "Error Getting Data");
          reject(response);
        });
    });
  }

  //method to register user
  registerModel(req) {
    let response = {
      success: true,
      message: "",
      data: "",
      status: 200,
    };
    let user = {
      firstName: "",
      lastName: "",
      email: "",
    };

    return new Promise((resolve, reject) => {
      req
        .save()
        .then((data) => {
          user.firstName=data.fName,
          user.lastName=data.fName,
          user.email=data.email,

          (response.success = true),
          (response.message = "Registered Succesfully"),
            (response.data = user),
            (response.status = 200);
          reject(response);
        })
        .catch((err) => {
          logger.error("inside model err ", err);
          (response.success = false),
            (response.message = "Registration Failed"),
            (response.data = "err"),
            (response.status = 500);
          reject(response);
        });
    });
  }

  //method to find user
  updateModel(userId, update) {
    let response = {
      message: "",
      data: "",
      success: "",
      status: 200,
    };

    return new Promise((resolve, reject) => {
      console.log("Resetting password of userId", userId);
      userDb
        .findByIdAndUpdate(userId, update, {
          new: true,
        })
        .then((data) => {
          if (data) {
            (response.success = true),
              (response.data = data),
              (response.status = 200),
              (response.message = "Password Updated");
            resolve(response);
          } else {
            resolve({
              message: "Password Reset Failed ",
              data: data,
              status: 500,
            });
          }
        })
        .catch((err) => {
          logger.error("inside model err ", err);
          (response.success = false),
            (response.message = "Error Updating Data"),
            (response.data = "err"),
            (response.status = 500);
          reject(response);
        });
    });
  }
}

//exports class with Schema & db names
module.exports = { ModelClass, userDb };
