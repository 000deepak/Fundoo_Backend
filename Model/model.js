//imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");    //hashing password extension

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

//hashing password and storing in db
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  }
});

//comparing given passwords and from db
userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("password missing");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("error while comparing password", error.message);
  }
};

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
          //return status
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
}

//exports class with Schema & db names
module.exports = { ModelClass, User };

