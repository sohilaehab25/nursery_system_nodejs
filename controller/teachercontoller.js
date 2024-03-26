const teacherschema = require('../model/teacherModel');
const ClassShema = require('../model/classModel')
exports.getAllTeacher = (req, res, next) => {
    teacherschema.find({})
    .then((data)=>{
        res.status(200).json(data );
    }).catch((error) => {next(error)});
};

exports.getTeacherById = (req, res, next) => {
    teacherschema.findOne({_id: req.params._id})
    .then(data=>{
        if(!data){
          res.status(404).json({data: "Teacher not found"});
        }
        res.status(200).json(data);
      })
      .catch(err=>next(err));
    };
    

    exports.insertTeacher = (req, res, next) => {
      const { fullname, email, password, role } = req.body;
      const image = req.file.originalname; // Assuming multer or similar middleware has stored the filename
      console.log(req.file);
      console.log(image);
      //res.status(200).json({req:req.file});
      const newTeacher = new teacherschema({
        fullname: fullname,
        email: email,
        password: password,
        Image: image, // Store the filename of the image
        role: role
      });
    
      newTeacher.save()
        .then((data) => {
          res.status(200).json({ data });
        })
        .catch((error) => next(error));
    };
    
exports.updateTeacher = (req, res, next) => { 
    const id = req.body._id;
    teacherschema.findByIdAndUpdate(id, req.body, {new: true})
    .then(data => {
      if(!data){
        res.status(404).json({data: "Teacher not found"});
      }
      res.status(200).json({data: "updated Successful"});
    }).catch(err => next(err));
  };
  
  exports.getAllsupervisors = (req, res, next) => {
    ClassShema.find({})
    .populate(
      {
        path:'supervisor', 
        select: {fullName: 1},
      }
      )
    .then(data=>{
      let supervisors = data.map(item=>item.supervisor);
      res.status(200).json({supervisors})
    })
    .catch(err=>next(err));
  }
  
  
  
exports.deleteTeacher = (req, res, next) => { 
    const id = req.body._id;

    teacherschema.findByIdAndDelete(id)
    .then((deletedData) => {
        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json({ data: 'Your data is deleted successfully' });
    })
    .catch((error) => next(error));
};
