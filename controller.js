//imports
let service = require("./services");

//control class
class RegisterClass {
  registerControl(req, res) {
    service
      .registerService(req.body) //pass data to service
      .then((result) => {
        console.log("inside successful ", result);
      })
      .catch((err) => {
        console.log("failed", err);
      });
  }
}

//exports
module.exports = new RegisterClass();
