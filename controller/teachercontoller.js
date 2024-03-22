const teacherschema = require('../model/teacherModel');

exports.getAllTeacher = (req, res, next) => {
    teacherschema.find({})
    .then((data)=>{
        res.status(200).json({ data });
    }).catch((error) => {next(error)});
};

exports.getTeacherById = (req, res, next) => {
    teacherschema.findOne({_id: req.params.id})
    .then((data)=>{
        res.status(200).json({ data });
    }).catch((error) => {next(error)});
};


exports.insertTeacher = (req, res, next) => { 
    let object = new teacherschema(req.body);
    object
      .save()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => next(error));
  };

exports.updateTeacher = (req, res, next) => { // <-- Corrected order of parameters
    const id = req.params.id;
    const newData = req.body; 

    teacherschema.findByIdAndUpdate(id, newData, { new: true })
    .then((updatedData) => {
        if (!updatedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json({ data: updatedData });
    })
    .catch((error) => next(error));
};

exports.deleteTeacher = (req, res, next) => { // <-- Corrected order of parameters
    const id = req.params.id;

    teacherschema.findByIdAndDelete(id)
    .then((deletedData) => {
        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json({ data: 'Your data is deleted successfully' });
    })
    .catch((error) => next(error));
};
