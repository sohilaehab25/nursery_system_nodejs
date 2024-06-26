const mongoose = require('mongoose');
const classSchema = require('../model/classModel');
const childShema = require("../model/childModel");

//check if there is same child or not 
// async function checkDuplicateChildren(childrenToAdd){
//     const existingClasses = await classSchema.find({children: {$in: childrenToAdd}});
//     if(existingClasses.length > 0){
//         const existingChildIds = existingClasses.map(cls => cls.children).flat();
//         const duplicateChildIds = childrenToAdd.filter(childId => existingChildIds.includes(childId));
//         return duplicateChildIds;
//     }
//     return [];
// }

exports.getAllclass = (req, res, next) => {
    classSchema.find({})
    .populate({path:'supervisor', select: {_id:0,fullName: 1}})
    .populate({path: 'children' , select: {_id:0,fullName: 1}})
    .then((data)=>res.status(200).json({data}))
    .catch((err)=>next(err));
};

exports.getClassById = (req, res, next) => {
    classSchema.findOne({ _id: req.params.id })
    .populate({path:'supervisor', select: {_id:0,fullName: 1}})
    .populate({path: 'children' , select: {_id:0,fullName: 1}})
    .then((data)=>res.status(200).json({data}))
    .catch((err)=>next(err));
};

// exports.insertClass = async(req, res, next) => {
    // return res.status(200).json({mas:"in function"});
        // if(req.body._id != undefined){
    //     res.status(400).json({message:"You can not send id => this auto increment"});
    // }
    //check duplicate children
    // const childrenToAdd = req.body.children;
    // const duplicateChildIds = await checkDuplicateChildren(childrenToAdd);
    // return  res.status(200).json({mes: duplicateChildIds});

    // if (duplicateChildIds.length > 0) {
    //     return res.status(400).json({ message: `Children ${duplicateChildIds.join(', ')} already belong to another class` });
    // }
    // return res.status(200).json({mes:"in fin"})
// ;    const {name,supervisor,children} = req.body;
//     const newClass = new classSchema({
//         name,
//         supervisor,
//         children
//     });
//     newClass.save()
//     .then((data)=>res.status(200).json({data}))
//     .catch(err=>next(err));
// };

async function isChildAssignedToClass(childID) {
    // Query the classSchema to find any class document that contains the specified child ID
    const classWithChild = await classSchema.exists({ children: childID });
    return classWithChild; // Returns true if a class with the child is found, false otherwise
}

exports.insertClass = async (req, res, next) => {
    try {
        const { name, supervisor, children } = req.body;

        // Check if any of the children are already assigned to another class
        for (const child of children) {
            const isAssigned = await isChildAssignedToClass(child);
            if (isAssigned) {
                return res.status(400).json({ message: `Child ${child} is already assigned to another class` });
            }
        }

        // Create a new class instance
        const newClass = new classSchema({
            name,
            supervisor,
            children // Assuming children are already stored as ObjectIDs in the database
        });

        // Save the new class instance to the database
        const savedClass = await newClass.save();

        // If successful, send a success response with the saved class data
        res.status(201).json({ message: 'Class created successfully', data: savedClass });
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        next(error);
    }
};

exports.updateClass = (req,res,next)=>{
    const id = req.params.id;
    const newData = req.body;
    classSchema.findByIdAndUpdate(id, newData, {new : true})
    .then((updatedData)=>{
        if(!updatedData){
            return res.status(404).json({message: 'not found'});
        }
        res.status(200).json({data: updatedData});
    }).catch((error)=>{next(error)});
}

exports.deleteClass = (req, res, next) => {
    const id = req.params.id;
    classSchema.findByIdAndDelete(id)
    .then((deletedData)=>{
        if(!deletedData){
            return res.status(404).json({message:"not found"});
        }
        res.status(200).json({data:'is deleted'})
    }).catch((error)=>{next(error)});
}

exports.getClassChlidern = async(req,res,next)=>{
    try{
        const classID = req.params.id;
        const classInfo = await  classSchema.findById(classID);
        const className = classInfo.name;
        if (!classInfo) {
            return res.status(404).json({ message: "Class not found" });
        }
        const childrenIds = classInfo.children;
        const childrenInfo = await childShema.find({ _id: { $in: childrenIds } });

        if (!childrenInfo || childrenInfo.length === 0) {
            return res.status(404).json({ message: "No children found for this class" });
        }
        res.status(200).json({ name:className, childrenInfo });
    }catch(err){
        next(err);
    }
};

exports.getTeacherClass = (req,res,next)=>{
    const classID = req.params.id;
    classSchema.findById(classID).populate('supervisor')
    .then((data)=>{
        if(!data){
            res.status(404).json({message:"Class not found"});
        }
        res.status(200).json({class: data.name,supervisor: data.supervisor})
    }).catch(err=>next(err));
}
