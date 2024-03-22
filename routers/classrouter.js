const express = require('express');
const classController = require('./../controller/classcontroller');
const { insertValidator, updateValidator, deleteValidator } = require("./../midelware/validation/classvalidator");
const validationResult = require("../midelware/validation/validationResult");

const router = express.Router();

router.route("/class")
    .get(classController.getAllclass)
    .post(insertValidator, validationResult, classController.insertClass)
    .patch(updateValidator, validationResult, classController.updateClass)
    .delete(deleteValidator, validationResult, classController.deleteClass);

router.route("/class/:id").get(classController.getClassById);

module.exports = router;
