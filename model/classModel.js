const mongoose= require('mongoose');

const schema = new mongoose.Schema({
    // _id: Number,
    name: String,
    superVisor_id: { type: Number, ref: "teachers" },
    children: [{ type: Number, ref: "children" }]
});
module.exports = mongoose.model('Classes', schema)