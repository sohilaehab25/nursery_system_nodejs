const express = require('express');
const teacherController = require('./../controller/teachercontoller');
const  {
  insertValidator, updateValidator, deleteValidator
}= require("./../midelware/validation/teachervalidator");
const validationResult = require('./../midelware/validation/validationResult');
// const authmw = require("../midelware/validationmw");
const {isAdmin} = require('../midelware/authenticationmw');
const router = express.Router(); 

router
  .route("/teacher")
  .get(isAdmin, teacherController.getAllTeacher)
  .post(insertValidator, validationResult, teacherController.insertTeacher)
  .patch(updateValidator, validationResult, teacherController.updateTeacher)
  .delete(teacherController.deleteTeacher) 

router.route("/teacher/:id").get(teacherController.getTeacherById);

module.exports = router;
