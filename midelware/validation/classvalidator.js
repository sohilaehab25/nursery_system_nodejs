const { body, param } = require("express-validator");

exports.insertValidator = [
    body('_id')
    .isInt().
    withMessage('Id should be intger'),
    body("name")
        .isString()
        .withMessage("Name should be a string")
        .isLength({ max: 10 })
        .withMessage("Name should not exceed 10 characters"),
    body("supervisor_id")
        .isNumeric()
        .withMessage("Supervisor ID should be numeric"),
    body("children")
        .isArray()
        .withMessage("Children should be an array of child IDs")
        .optional()
];

exports.updateValidator = [
    param("_id")
        .isInt()
        .withMessage("ID should be an integer"),
    body("name")
        .optional()
        .isString()
        .withMessage("Name should be a string")
        .isLength({ max: 10 })
        .withMessage("Name should not exceed 10 characters"),
    body("supervisor")
        .optional()
        .isNumeric()
        .withMessage("Supervisor ID should be numeric")
        .isMongoId()
        .withMessage("Enter a valid supervisor ID"),
    body("children")
        .optional()
        .isArray()
        .withMessage("Children should be an array of child IDs")
];

exports.deleteValidator = [
    param("id")
        .isInt()
        .withMessage("ID should be an integer")
];
