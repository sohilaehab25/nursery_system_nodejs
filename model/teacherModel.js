const mongoose= require('mongoose');

//create schema
const schema= new mongoose.Schema({
    _id: Object,
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
    supervisor_id:  Number ,
    Image:String 
});

module.exports = mongoose.model('teachers', schema);