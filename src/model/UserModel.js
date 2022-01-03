//imports
const mongoose = require("mongoose");

//db Schema
const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
    },
    lName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
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
  findUser(req){
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
              (response.status = 422),
              (response.message = "User  Found");
            resolve(response);
          } else {
            resolve({
              message: "user not found please register first",
              data: data,
              status: 200,
            });
          }
        })
        .catch((err) => {
          logger.err("inside model err ", result);
          reject({ success: false, error: err });
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

    return new Promise((resolve, reject) => {
      req
        .save()
        .then((data) => {
          (response.success = true),
            (response.message = " Registered Succesfully"),
            (response.data = data),
            (response.status = 200);
          resolve(response);
        })
        .catch((err) => {
          logger.err("inside model err ", result);
          (response.success = false),
            (response.message = " Registration Failed"),
            (response.data = ""),
            (response.status = 500);
          reject(response);
        });
    });
  }
    
  //method to find user
  updateModel(userId,update){
    let response = {
      message: "",
      data: "",
      success: "",
      status: 200,
    };

    return new Promise((resolve, reject) => {
      console.log("Resetting password of userId",userId );
      userDb
        .findByIdAndUpdate(userId, update, {
          new: true,
        })
        .then((data) => {
          if (data) {
            (response.success = true),
              (response.data = data),
              (response.status = 422),
              (response.message = "User Password Updated");
            resolve(response);
          } else {
            resolve({
              message: "Password Reset Failed ",
              data: data,
              status: 200,
            });
          }
        })
        .catch((err) => {
          logger.err("inside model err ", result);
          reject({ success: false, error: err });
        });
    });
  }
}

//exports class with Schema & db names
module.exports = { ModelClass, userDb };

