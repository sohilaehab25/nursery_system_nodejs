const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

//create schema
const schema= new mongoose.Schema({
    fullname: {
        type: String, 
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    email: {
         type: String,
         unique: true },
    Image:String ,
    role: { type: String, enum: ['admin', 'teacher'], required: true},

});

module.exports = mongoose.model('teachers', schema);
