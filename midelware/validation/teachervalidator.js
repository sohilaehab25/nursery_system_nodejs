const { body, param, query } = require("express-validator");

exports.insertValidator = [
    body("_id")
        .isMongoId()
        .withMessage("id should be a valid MongoDB ObjectId"),

    body("fullname")
        .isString()
        .notEmpty()
        .withMessage("Full name is required"),

    body("password")
        .isString()
        .isLength({ min: 3, max: 30 })
        .withMessage("Password must be between 3 and 30 characters"),

    body("email")
        .isEmail()
        .withMessage("Enter a valid email address"),

    body("image")
        .optional()
        .isString()
        .withMessage("Image must be a string")
];

exports.updateValidator = [
    param("_id")
        .isMongoId()
        .withMessage("id should be a valid MongoDB ObjectId"),

    body("fullname")
        .isString()
        .notEmpty()
        .withMessage("Full name is required"),

    body("password")
        .optional()
        .isString()
        .isLength({ min: 3, max: 30 })
        .withMessage("Password must be between 3 and 30 characters"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Enter a valid email address"),

    body("image")
        .optional()
        .isString()
        .withMessage("Image must be a string")
];

exports.deleteValidator = [
    param("_id")
        .isMongoId()
        .withMessage("id should be a valid MongoDB ObjectId")
];
