const teacherschema = require('../model/teacherModel');
const jwt = require('jsonwebtoken');


exports.login = (req, res, next) =>{
teacherschema.findOne({
    fullname: req.body.fullname,
    password : req.body.password,
})
.then((object)=>{
    if(!object){
        console.log("hi from login page")
        throw new Error("Not Authenticated")
    }
    console.log(object);
    let token = jwt.sign({
        _id: object._id,
        role: object.role

    },
    "nursery system",
    {expiresIn: "2hr"}
    );
    res.json({data: "Authenticated", token});
})
.catch((error)=>{next(error)});
}
