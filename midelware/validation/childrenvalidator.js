const { body, param, query } = require('express-validator');

exports.insertValidator = [
    body("fullName")
        .isString()
        .withMessage("fullName should be string")
        .isLength({ min: 3 })
        .withMessage("child name >3"),
    body("age")
        .isInt()
        .withMessage("Age should be Number"),
    body("level")
        .isIn(["PREKG", "KG1", "KG2"])
        // .toLowerCase() 
        .withMessage("You should select one of existed levels"),
    body('address').isObject().withMessage('address must be an object'),
    // body("address.city").isLength({min: 3}).withMessage("city min length is 3"),
    // body("address.street").isLength({min: 3}).withMessage("street min length is 3"),
    // body("address.building").isNumeric().withMessage("Invalid building")
];


exports.updateValidator = [
    // param("_id").isInt().withMessage("child Id should be integer"),
    body("fullName")
            .optional()
            .isString()
            .withMessage("fullName should be string")
            .isLength({ min: 3 })
            .withMessage("child name >3"),
        body("age")
            .optional()
            .isInt()
            .withMessage("Age should be Number"),
        body("level")
        .optional()
            .isIn(["PREKG", "KG1", "KG2"])
            .withMessage("You should select one of existed levels"),
        body("address.city").optional().isString().withMessage("Invalid city"),
        body("address.street")           
         .optional()
        .isString().withMessage("Invalid street"),
        // body("address.bulding").isNumeric().withMessage("Invalid bulding")
    
    ];
    

