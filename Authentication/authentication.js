const jwt = require("jsonwebtoken");

var auth = (req,res,next) => {
  let token = req.headers["token"];
  console.log("token", token);

  jwt.verify(token,"secret",function (err, decoded) {
    if (err) {
      return res.status(401).send({ message: "authentication failed/not authentication " });
    } else {
      req.body["data"] = decoded;
      req.token = decoded;
      console.log(req.body, decoded,"authorization decoded");
      //id=req.body.data.id
      next();
    }
  });
};

module.exports = auth;

