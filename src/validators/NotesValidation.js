/**
 * @purpose      To validate note data 
 * @module       validators
 * @file         NotesValidation.js
 * @author       deepak
 * @since        27/12/2022
 */

class NoteValidationClass {
  note = (req, res, next) => {
    req.check("title").isLength({ min: 1 }).withMessage("title is required");

    req.check("isArchived").isBoolean().withMessage("isArchived should be boolean");

    req.check("isDeleted").isBoolean().withMessage("isDeleted should be boolean");

    let error = req.validationErrors();

    if (error) {
      return res.status(500).send(error);
    } else {
      next();
    }
  };
}

module.exports = new NoteValidationClass();
