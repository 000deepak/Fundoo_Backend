//imports
let service = require("../Services/services");
//service class is exported as reference(object) so we can use it directly to access methods.

//control class
class RegisterClass {
  registerControl(req, res) {
    //when "/register" is hit this method is called and "req"(data) is passesd.
    service
      .registerService(req.body)
      .then((result) => {
        //then is run after returning promise.
        console.log("inside controller ,successful ", result);
      })
      .catch((err) => {
        //catch is run if we get error for promise return
        console.log("inside controller ,failed", err);
      });
  }

  getController(req, res) {
    service
      .getService(req)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("inside controller ,failed", err);
      });
  }
}
//exports
module.exports = new RegisterClass();

//1.import service
//2.
