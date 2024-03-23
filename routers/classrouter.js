const express = require('express');
const classController = require('./../controller/classcontroller');
const { insertValidator, updateValidator, deleteValidator } = require("./../midelware/validation/classvalidator");
const validationResult = require("../midelware/validation/validationResult");

const router = express.Router();

router.route("/class")
    .get(classController.getAllclass)
    .post(insertValidator, validationResult, classController.insertClass)
    .patch(updateValidator, validationResult, classController.updateClass)
    .delete( classController.deleteClass);
    router.get('/class/child/:id', classController.getClassChlidern);
    router.get('/class/teacher/:id',classController.getTeacherClass);
    
    router.route('/class/:id')
        .get(classController.getClassById)
        .delete(classController.deleteClass)

module.exports = router;
