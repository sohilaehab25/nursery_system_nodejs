const mongoose = require('mongoose');
const autoIncrement = require('@alec016/mongoose-autoincrement');

autoIncrement.initialize(mongoose.connection);

const addressSchema = new mongoose.Schema({
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String }
}, { _id: false });

const schema = new mongoose.Schema({
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    level: {
        type: String,
        enum: ['PreKG', 'KG1', 'KG2'],
        required: true
    },
    address: addressSchema
});

schema.plugin(autoIncrement.plugin, {
    model: 'Children',
    startAt: 1,
    incrementBy: 1,
    field: 'child_id'
});

module.exports = mongoose.model("Children", schema);
