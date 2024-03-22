const { body, param, query } = require('express-validator');

exports.insertValidator = [
    body("_id").isInt().withMessage("child Id should be integer"),
    body("fullName")
        .isAlpha()
        .withMessage("fullName should be string")
        .isLength({ max: 10 })
        .withMessage("child name <10"),
    body("age")
        .isInt()
        .withMessage("Age should be Number"),
    body("level")
        .isIn(["PREKG", "KG1", "KG2"])
        .toLowerCase() 
        .withMessage("You should select one of existed levels"),
    body("address.city").isString().withMessage("Invalid city"),
    body("address.street").isString().withMessage("Invalid street"),
    body("address.building").isNumeric().withMessage("Invalid building")
];


exports.updateValidator = [
    param("_id").isInt().withMessage("child Id should be integer"),
    body("fullName")
            .isAlpha()
            .withMessage("fullName should be string")
            .isLength({ max: 10 })
            .withMessage("child name <10"),
        body("age")
            .isInt()
            .withMessage("Age should be Number"),
        body("level")
            .isIn(["PREKG", "KG1", "KG2"])
            .withMessage("You should select one of existed levels"),
        body("address.city").isString().withMessage("Invalid city"),
        body("address.street").isString().withMessage("Invalid street"),
        body("address.bulding").isNumeric().withMessage("Invalid bulding")
    
    ];
    
exports.deleteValidator = [
    param("_id")
        .isInt()
        .withMessage("ID should be an integer")
];
