class NoteValidationClass {
  note = (req, res, next) => {
    req
      .check("title")
      .isLength({ min: 1 })
      .withMessage("title is required");

    let error = req.validationErrors();

    if (error) {
      return res.status(500).send(error);
    } else {
      next();
    }
  };
}

module.exports = new NoteValidationClass();