const childrenschema = require('../model/childModel');

exports.getAllchildren = (req, res, next) => {
    childrenschema.find({})
    .then((data) => {
        res.status(200).json(data);
    }).catch((error) => { next(error) });
};

exports.getchildrenById = (req, res, next) => {
    childrenschema.findOne({ _id: req.params.id })
    .then((data) => {
        if (!data) {
            return res.status(404).json({ message: 'child not found' });
        }
        res.status(200).json(data);
    }).catch((error) => { next(error) });
};

exports.insertChild = (req, res, next) => {
 
    const { fullname, age, level, address } = req.body;
    const image = req.file.originalname; 
    
    if (req.body._id !== undefined) {
        return res.status(400).json({ message: 'id is Auto increment' });
    }
    const newChild = new teacherschema({
      fullname: fullname,
      age: age,
      level:level,
      Image: image, 
      address: address
    });
    // const newChild = new childrenschema(req.body); // Use childrenschema instead of childShema
    newChild.save()
    .then(data => res.status(201).json(data))
    .catch(err => next(err));
};

exports.updateChild = (req, res, next) => {
    const id = req.body._id;
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
    const id = req.body._id;

    childrenschema.findByIdAndDelete(id)
    .then((deletedData) => {
        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json({ data: 'Your data is deleted successfully' });
    })
    .catch((error) => next(error));
};
