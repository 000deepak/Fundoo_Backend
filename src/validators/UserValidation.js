/**
 * @purpose      To validate user data 
 * @module       service
 * @file         UserValidation.js
 * @author       deepak
 * @since        9/1/2022
 */

class ValidationClass {
  signUp = (req, res, next) => {
    req
      .check("fName")
      .isAlpha()
      .withMessage("firstName is required")
      .isLength({ min: 4 })
      .withMessage("Min 4 alphabet required in FirstName");

    req
      .check("lName")
      .isAlpha()
      .withMessage("lastName is required")
      .isLength({ min: 4 })
      .withMessage("Min 4 alphabet required in LastName");

    req.check("email").isEmail().trim().escape().normalizeEmail().withMessage("Email is not valid");

    req
      .check("password")
      .isLength({ min: 6 })
      .withMessage("Min 6 alphabet required")
      .isLength({ max: 10 })
      .withMessage("Max 10 alphabet allowed in password")
      .matches("[0-9]")
      .withMessage("Password Must Contain a Number")
      //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
      //.withMessage(
      //"Password should contain atleast one Uppercase & Lower case letter,Special character,Number and min 8 , max 20 char long")
      .trim()
      .escape();

    let error = req.validationErrors();

    if (error) {
      return res.status(500).send(error);
    } else {
      next();
    }
  };

  login = (req, res, next) => {
    req.check("email").isEmail().trim().escape().normalizeEmail().withMessage("Email is not valid");

    req
      .check("password")
      .isLength({ min: 3 })
      .withMessage("Min 3 alphabet required")
      .isLength({ max: 10 })
      .withMessage("Max 10 alphabet allowed in password")
      .trim()
      .escape();

    let error = req.validationErrors();
    if (error) {
      return res.status(500).send(error);
    } else {
      next();
    }
  };

  email = (req, res, next) => {
    req.check("email").isEmail().trim().escape().withMessage("Email is not valid");

    let error = req.validationErrors();
    if (error) {
      return res.status(500).send(error);
    } else {
      next();
    }
  };

  confirmPassword = (req, res, next) => {
    req
      .check("confirmPassword")
      .isLength({ min: 6 })
      .withMessage("Min 6 alphabet required")
      .isLength({ max: 10 })
      .withMessage("Max 10 alphabet allowed in password")
      .matches("[0-9]")
      .withMessage("Password Must Contain a Number")
      //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
      //.withMessage(
      //"Password should contain atleast one Uppercase & Lower case letter,Special character,Number and min 8 , max 20 char long")
      .trim()
      .escape();

    let error = req.validationErrors();
    if (error) {
      return res.status(500).send(error);
    } else {
      next();
    }
  };
}

module.exports = new ValidationClass();
