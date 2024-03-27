const bcrypt = require('bcrypt');
const teacherschema = require('../model/teacherModel');

exports.changepassword = async (req, res, next) =>{
    const newpassword = req.body;
    try{
        let teacher = await teacherschema.findById(req.params._id);
        if(!teacher){
           return res.status(404).json({massage:"teacher who you want to change his password is not found"})
        }
   
        //make new password
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        teacher.password = hashedPassword
        await teacher.save();
        res.status(200).json({massage:"password is changed successfully"});
    }
    catch(error){next(error);}
}
