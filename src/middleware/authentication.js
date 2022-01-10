const jwt = require("jsonwebtoken");
const logger = require("../middleware/logger");

var auth = (req, res, next) => {
  let token = req.headers["token"];

  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      return res.status(401).send({ message: "authentication failed " });
    } else {
      req.body["data"] = decoded;
      req.token = decoded;
      logger.info(
        " req.body.data ",
        req.body.data,
        "decoded value",
        decoded,
        "request.token=",
        req.token
      );
      //id=req.body.data.id
      next();
    }
  });
};

module.exports = auth;
