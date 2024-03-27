const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

//create schema
const schema= new mongoose.Schema({
    // _id: Object,
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
    // supervisor_id:  Number ,
    Image:String ,
    role: { type: String, enum: ['admin', 'teacher'], required: true},

});
schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

module.exports = mongoose.model('teachers', schema);
