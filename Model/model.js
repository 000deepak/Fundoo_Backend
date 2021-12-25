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

const User = mongoose.model("FundooDb", userSchema);
//exporting this user as shown at end  and create the same user using fileName.exportedUser(model.user)

//model class

class ModelClass {
  registerModel(req) {
    let response = {
      success: true,
      message: "",
      data: "",
    };

    return new Promise((resolve, reject) => {
      req
        .save() //save data to db
        .then((data) => {
          //return status and data
          (response.success = true),
            (response.message = "user registration SUCCESSFUL");
          (response.data = data), (response.status = 200);
          resolve({ response });
        })
        .catch((err) => {
          (response.success = false),
            (response.message = "user registration FAILED");
          (response.data = data), (response.status = 200);
          reject({ response });
        });
    });
  }


  loginModel(req){
    return new Promise((resolve,response)=>{
      let user = User.findOne({email: req.body.email});
      resolve(user);
    }).catch((err)=>{
      resolve("Error")
    })
  }
}

//exports class with Schema & db names
module.exports = { ModelClass, User };
