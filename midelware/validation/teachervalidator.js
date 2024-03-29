const { body, param, query } = require("express-validator");
const teacherschema = require('../../model/teacherModel');

exports.insertValidator = [

    body("fullname")
    
        .isString()
        .withMessage('name must be string')
        .notEmpty()
        .withMessage("Full name is required"),

    body("password")
        .isString()
        .withMessage("Password must be string")
        .isLength({ min: 3, max: 10 })
        .withMessage("Password must be between 3 and 30 characters"),
    body("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .custom(async (value, { req }) => {
            // Check if email already exists
            const existingTeacher = await teacherschema.findOne({ email: value });
            if (existingTeacher) {
                throw new Error("Email already exists");
            }
            return true;
        }),

    body("image")
        .optional()
        .isString()
        .withMessage("Image must be a string"),
    
];

exports.updateValidator = [

    body("fullname")
    .optional()
        .isString()
        .notEmpty()
        .withMessage("Full name is required"),

    body("password")
        .optional()
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

