const mongoose = require('mongoose');
// const autoIncrement = require('@alec016/mongoose-autoincrement');

// autoIncrement.initialize(mongoose.connection);

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    supervisor: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'teachers' },
    children: [{ type: Number, required: true, ref: 'Children' }]
});
//{child --> id->int}
//{cass->children->int}
// schema.plugin(autoIncrement.plugin, {
//     model: 'Classes',
//     startAt: 1,
//     incrementBy: 1,
//     field: 'classid'
// });

module.exports = mongoose.model('Classes', schema);
