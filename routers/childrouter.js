const express = require('express');
const router = express.Router();

const { body, param, query } = require('express-validator');
const childController = require('../controller/childconroller'); 
const { insertValidator, updateValidator, deleteValidator } = require('../midelware/validation/childrenvalidator'); 
const validationResult = require('../midelware/validation/validationResult'); 


router
    .route('/children')
    .get(childController.getAllchildren)
    .post(insertValidator, validationResult, childController.insertChild)
    .patch(updateValidator, validationResult, childController.updateChild)
    .delete(deleteValidator, validationResult, childController.deleteChild); 

router.route("/children/:id").get(childController.getchildrenById);

module.exports = router;

