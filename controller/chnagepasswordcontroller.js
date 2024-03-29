const bcrypt = require('bcrypt');
const teacherschema = require('../model/teacherModel');

exports.changepassword = async (req, res, next) =>{
    const { password, _id } = req.body; // Extract password and _id from req.body
    try {
        let teacher = await teacherschema.findById(_id);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher whom you want to change their password is not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        teacher.password = hashedPassword;
        await teacher.save();
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        next(error);
    }
}
