const childrenschema = require('../model/childModel');

exports.getAllchildren = (req, res, next) => {
    childrenschema.find({})
    .then((data)=>{
        res.status(200).json({ data });
    }).catch((error) => {next(error)});
};

exports.getchildrenById = (req, res, next) => {
    childrenschema.findOne({_id: req.params.id})
    .then((data)=>{
        res.status(200).json({ data });
    }).catch((error) => {next(error)});
};

exports.insertChild = (req, res, next) => {
    let object = new childrenschema(req.body);
    object
      .save()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => next(error));
  };
exports.updateChild = (req, res, next) => {
    const id = req.params.id;
    const newData = req.body; 

    childrenschema.findByIdAndUpdate(id, newData, { new: true })
    .then((updatedData) => {
        if (!updatedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json({ data: updatedData });
    })
    .catch((error) => next(error));
};

exports.deleteChild = (req, res, next) => {
    const id = req.params.id;

    childrenschema.findByIdAndDelete(id)
    .then((deletedData) => {
        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json({ data: 'Your data is deleted successfully' });
    })
    .catch((error) => next(error));
};
