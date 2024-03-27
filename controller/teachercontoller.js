const bcrypt = require('bcrypt')
const teacherschema = require('../model/teacherModel');
const ClassShema = require('../model/classModel')
exports.getAllTeacher = (req, res, next) => {
    teacherschema.find({})
    .then((data)=>{
        res.status(200).json(data );
    }).catch((error) => {next(error)});
};

exports.getTeacherById = (req, res, next) => {
  teacherschema.findOne({ _id: req.params.id })
  .then((data) => {
      if (!data) {
          return res.status(404).json({ message: 'teacher you search about him not found' });
      }
      res.status(200).json(data);
  }).catch((error) => { next(error) });
};

    exports.insertTeacher = async (req, res, next) => {
      const { fullname, email, password, role } = req.body;
      const image = req.file.originalname; // Assuming multer or similar middleware has stored the filename
      // console.log(req.file);
      // console.log(image);
      //res.status(200).json({req:req.file});
      try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt round
    
        // Create a new teacher object with hashed password
        const newTeacher = new teacherschema({
          fullname: fullname,
          email: email,
          password: hashedPassword,
          Image: image, // Store the filename of the image
          role: role
        });
    
        // Save the new teacher to the database
        await newTeacher.save();
    
        res.status(200).json({ message: 'Teacher inserted successfully' });
      } catch (error) {
        next(error); // Pass any errors to the error handling middleware
      }
    }; 
exports.updateTeacher = (req, res, next) => { 
  const id = req.body._id;
  const newData = req.body;

  teacherschema.findByIdAndUpdate(id, newData, { new: true })
  .then((updatedData) => {
      if (!updatedData) {
          return res.status(404).json({ message: 'teacher you want to update not here' });
      }
      res.status(200).json({ data: updatedData });
  })
  .catch((error) => next(error));
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
