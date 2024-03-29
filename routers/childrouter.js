const express = require('express');
const {isAdmin} = require('../midelware/authenticationmw');

const router = express.Router();

const { body, param, query } = require('express-validator');
const childController = require('../controller/childconroller'); 
const { insertValidator, updateValidator} = require('../midelware/validation/childrenvalidator'); 
const validationResult = require('../midelware/validation/validationResult'); 


router
    .route('/children')
    .get(childController.getAllchildren)
    .post(isAdmin,insertValidator,validationResult, childController.insertChild)
    .patch(updateValidator, validationResult, childController.updateChild)
    .delete(childController.deleteChild); 


router.route("/children/:id")
.get(childController.getchildrenById)



module.exports = router;

