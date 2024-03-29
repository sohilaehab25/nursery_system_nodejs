const bcrypt = require('bcrypt');
const fs = require('fs')
const teacherschema = require('../model/teacherModel');
const ClassShema = require('../model/classModel');


/**
 * @swagger
 * /teacher:
 *   get:
 *     summary: Get all teachers
 *     tags:
 *       - teachers
 *     responses:
 *       '200':
 *         description: List of all teachers
 *       '500':
 *         description: Error occurred
 */
exports.getAllTeacher = (req, res, next) => {
    teacherschema.find({})
    .then((data)=>{
        res.status(200).json(data );
    }).catch((error) => {next(error)});
};

/**
 * @swagger
 * /teacher/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     tags:
 *       - teachers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
 *     responses:
 *       '200':
 *         description: Teacher found
 *       '404':
 *         description: Teacher not found
 *       '500':
 *         description: Error occurred
 */

exports.getTeacherById = (req, res, next) => {
  teacherschema.findOne({ _id: req.params.id })
  .then((data) => {
      if (!data) {
          return res.status(404).json({ message: 'teacher you search about him not found' });
      }
      res.status(200).json(data);
  }).catch((error) => { next(error) });
};

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Insert a new teacher
 *     tags:
 *       - teachers
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               Image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Teacher inserted successfully
 *       '500':
 *         description: Error occurred
 */



exports.insertTeacher = async (req, res, next) => {
  const { fullname, email, password, role } = req.body;
  const image = req.file.originalname; 

  try {
    // Check if the role is 'admin'
    if (role === 'admin') {
      // Check if there is already an admin in the database
      const adminExists = await teacherschema.exists({ role: 'admin' });
      if (adminExists) {
        return res.status(400).json({ message: 'Only one admin is allowed.' });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); 

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

/**
 * @swagger
 * /teacher:
 *   patch:
 *     summary: Update a teacher
 *     description: Update details of an existing teacher. Allows updating of full name, email, password, and profile image.
 *     tags:
 *       - teachers
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The ID of the teacher to update.
 *               fullname:
 *                 type: string
 *                 description: The updated full name of the teacher.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The updated email address of the teacher.
 *               password:
 *                 type: string
 *                 description: The updated password of the teacher. (Optional)
 *               file:
 *                 type: file
 *                 description: Optional. The updated profile image of the teacher.
 *     responses:
 *       '200':
 *         description: Teacher updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming the update.
 *                 data:
 *                   $ref: '#/components/schemas/Teacher'
 *       '404':
 *         description: Teacher not found.
 *       '500':
 *         description: Internal server error.
 */



exports.updateTeacher = async (req, res, next) => {
  const id = req.body._id;
  const newData = req.body;
  let imageUrl = '';

  // Check if a new image file is uploaded
  if (req.file) {
    imageUrl = `../images/${req.file.originalname}`;
    newData.Image = imageUrl; 
  }

  try {
    // Find the teacher by ID
    let updatedTeacher = await teacherschema.findById(id);

    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check if the role is 'admin'
    if (newData.role === 'admin') {
      // Check if there is already an admin in the database
      const adminExists = await teacherschema.exists({ role: 'admin', _id: { $ne: id } });
      if (adminExists) {
        return res.status(400).json({ message: 'Only one admin is allowed.' });
      }
    }

    if (newData.password) {
      const hashedPassword = await bcrypt.hash(newData.password, 10);
      newData.password = hashedPassword;
    }

    Object.assign(updatedTeacher, newData);

    updatedTeacher = await updatedTeacher.save();

    res.status(200).json({ message: 'Teacher updated successfully', data: updatedTeacher });
  } catch (error) {
    next(error);
  }
};


/**
 * @swagger
 * /supervisors:
 *   get:
 *     summary: Get all supervisors
 *     tags:
 *       - teachers
 *     responses:
 *       '200':
 *         description: List of all supervisors
 *       '500':
 *         description: Error occurred
 */
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
  
  
/**
 * @swagger
 * /teacher:
 *   delete:
 *     summary: Delete teacher by ID
 *     tags:
 *       - teachers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Teacher deleted successfully
 *       '404':
 *         description: Teacher not found
 *       '500':
 *         description: Error occurred
 */
  
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
