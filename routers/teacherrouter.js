const express = require('express');
const teacherController = require('./../controller/teachercontoller');
const  {
  insertValidator, updateValidator, deleteValidator
}= require("./../midelware/validation/teachervalidator");
const validationResult = require('./../midelware/validation/validationResult');
const router = express.Router(); 

router
  .route("/teacher")
  .get(teacherController.getAllTeacher)
  .post(insertValidator, validationResult, teacherController.insertTeacher)
  .patch(updateValidator, validationResult, teacherController.updateTeacher)
  .delete(deleteValidator, validationResult, teacherController.deleteTeacher) 

router.route("/teacher/:id").get(teacherController.getTeacherById);

module.exports = router;
