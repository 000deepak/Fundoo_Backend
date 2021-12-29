//imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
//exporting this user as shown at end  and create the same user using fileName.exportedUser(model.user)

//model class
class ModelClass {
  findUser(req) {
    let response = {
      message: "",
      data: "",
      success: "",
      status: 200,
    };

    return new Promise((resolve, reject) => {
      userDb
        .find({ email: req.email })
        .then((data) => {
          if (data.length > 0) {
            (response.success = true),
              (response.data = data),
              (response.status = 422),
              (response.message = "user  already exists");
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
          console.log(err);
          reject({ success: false, error: err });
        });
    });
  }

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
          (response.success = false),
            (response.message = " Registration Failed"),
            (response.data = ""),
            (response.status = 500);
          reject(response);
        });
    });
  }
}

//exports class with Schema & db names
module.exports = { ModelClass, userDb };

//find returns array
//findOne returns object
