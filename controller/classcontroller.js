const classSchema = require('../model/classModel');

exports.getAllclass = (req, res, next) => {
    classSchema.find({})
    .then((data) => {
        res.status(200).json({ data });
    })
    .catch((error) => { next(error) });
};

exports.getClassById = (req, res, next) => {
    classSchema.findOne({ _id: req.params.id })
  
    .then((object) => {
        if(!object){
            return res.status(404).json({massage: 'class not found'})
        }
        res.status(200).json({ object });
    })
    .catch((error) => { next(error) });
};

exports.insertClass = (req, res, next) => {
    // const { _id, ...requestData } = req.body; // Destructure _id from request body
    const newObject = new classSchema(requestData); // Create new object without _id
    newObject
    .save()
    .then((data) => {
        res.status(200).json({ data });
    })
    .catch((error) => { next(error) });
};

    // console.log(req.body);
    // res.status(200).json({data:"data is added"})

exports.updateClass = (res,req,next)=>{
    const id = req.params;
    const newData = req.params;
    classSchema.findByIdAndUpdate(id, newData, {new : true})
    then((updatedData)=>{
        if(!updatedData){
            return res.status(404).json({massage: 'not found'});
        }
        res.status(200).json({data:updatedData})
    }).catch((error)=>{next(error)});
}
exports.deleteClass = (res, req, next) => {
    const {id} = req.params;
    classSchema.findByIdAndDelete(id)
    .then((deletedData)=>{
        if(!deletedData){
            return res.status(404).json({massage:"not found"});

        }
        res.status(200).json({data:'is deleted'})
    }).catch((error)=>{next(error)});

}


