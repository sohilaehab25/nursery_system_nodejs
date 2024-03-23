const { body, param } = require("express-validator");
const teacherShema = require('../../model/teacherModel');
const childShema = require('../../model/childModel');

exports.insertValidator = [
    body('_id')
    .isInt().
    withMessage('Id should be intger'),
    body("name")
        .isString()
        .withMessage("Name should be a string")
        .isLength({ max: 10 })
        .withMessage("Name should not exceed 10 characters"),
        body("supervisor").isMongoId().withMessage("supervisor must be a number").custom(
            async(value)=>{
                const supervisorExists = await teacherShema.exists({ _id: value });
                if(!supervisorExists){
                    throw new Error("supervisor doesn't exist");
                }
                return true;
            }),
    
    body("children")
        .isArray()
        .withMessage("Children should be an array of child IDs")
        .optional()
        .custom(arr=>arr.length > 2).withMessage("class must have at least 2 child").custom(async(children)=>{
            const invalidID = [];
            for(let childID of children){
                const childExists = await childShema.exists({ _id: childID });
                if(!childExists){
                    invalidID.push(childID);
                }
            }
            if(invalidID.length > 0){
                throw new Error(`child with id ${invalidID.join(', ')} doesn't exist in table Childs`);
            }
            return true;
        }),
    ];
    

exports.updateValidator = [
    // param("_id")
    //     .isInt()
    //     .withMessage("ID should be an integer"),
    body("name")
        .optional()
        .isString()
        .withMessage("Name should be a string")
        .isLength({ max: 10 })
        .withMessage("Name should not exceed 10 characters"),
        body("supervisor").optional().isMongoId().withMessage("supervisor must be a number").custom(
            async(value)=>{
                const supervisorExists = await teacherShema.exists({ _id: value });
                if(!supervisorExists){
                    throw new Error("supervisor doesn't exist");
                }
                return true;
            }),
    
        body("children").optional().isArray().withMessage("children must be an array").custom(arr=>arr.length > 2).withMessage("class must have at least 2 child").custom(arr=>arr.length > 2).withMessage("class must have at least 2 child").custom(async(children)=>{
            const invalidID = [];
            for(let childID of children){
                const childExists = await childShema.exists({ _id: childID });
                if(!childExists){
                    invalidID.push(childID);
                }
            }
            if(invalidID.length > 0){
                throw new Error(`child with id ${invalidID.join(', ')} doesn't exist in table Childs`);
            }
            return true;
        }),
    ];
