const express = require('express');
const teacherController = require('./../controller/teachercontoller');
const  {
  insertValidator, updateValidator, deleteValidator
}= require("./../midelware/validation/teachervalidator");
const validationResult = require('./../midelware/validation/validationResult');
const passwordcontroller = require('../controller/chnagepasswordcontroller');
// const {isAdmin} = require('../midelware/authenticationmw');
// const {isteacher} = require('../midelware/authenticationmw');
const router = express.Router(); 

router
  .route("/teacher")
  .get(teacherController.getAllTeacher)
  .post( insertValidator,validationResult,teacherController.insertTeacher)


router.route("/teacher/:id")
.get(teacherController.getTeacherById)
.delete(teacherController.deleteTeacher) 
.patch(updateValidator, validationResult, teacherController.updateTeacher)
.patch(passwordcontroller.changepassword)

router.route("/supervisors").get(teacherController.getAllsupervisors);




module.exports = router;
