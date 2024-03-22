const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    city: String,
    street: String,
    building: Number 
}, { _id: false });

const schema = new mongoose.Schema({
    _id: Number,
    fullName: {
        type: String,
        required: true
    },
    age: Number,
    level: { type: String, enum: ['PreKG', 'KG1', 'KG2'] },
    address: addressSchema  
});

module.exports = mongoose.model("Children", schema);
