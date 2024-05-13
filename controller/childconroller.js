const childrenschema = require('../model/childModel');
const fs = require('fs');

/**
 * @swagger
 * /children:
 *   get:
 *     summary: Get all children
 *     tags:
 *       - children
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Error occurred
 */
exports.getAllchildren = (req, res, next) => {
    childrenschema.find({})
    .then((data) => {
        res.status(200).json(data);
    }).catch((error) => { next(error) });
};

/**
 * @swagger
 * /children/{id}:
 *   get:
 *     summary: Get a child by ID
 *     tags:
 *       - children
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the child to get
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Child not found
 *       '500':
 *         description: Error occurred
 */
exports.getchildrenById = (req, res, next) => {
    childrenschema.findOne({ _id: req.params.id })
    .then((data) => {
        if (!data) {
            return res.status(404).json({ message: 'child not found' });
        }
        res.status(200).json(data);
    }).catch((error) => { next(error) });
};

/**
 * @swagger
 * /children:
 *   post:
 *     summary: Insert a new child
 *     tags:
 *       - children
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               age:
 *                 type: number
 *               level:
 *                 type: string
 *               address:
 *                 type: string
 *               Image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Child inserted successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Error occurred
 */
exports.insertChild = (req, res, next) => {
    const { fullName, age, level, address } = req.body;
    const Image = req.file?.originalname; // Using optional chaining operator
    
    if (!Image) {
        return res.status(400).json({ message: 'Image file is required' });
    }
       
    if (req.body._id !== undefined) {
        return res.status(400).json({ message: 'id is Auto increment' });
    }
    const newChild = new childrenschema({
      fullName,
      age,
      level,
      Image, 
      address
    });
    newChild.save()
    .then(data => res.status(201).json(data))
    .catch(err => next(err));
};

/**
 * @swagger
 * /children:
 *   patch:
 *     summary: Update a child
 *     tags:
 *       - children
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               fullName:
 *                 type: string
 *               age:
 *                 type: number
 *               level:
 *                 type: string
 *               address:
 *                 type: string
 *               Image:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Child updated successfully
 *       '404':
 *         description: Child not found
 *       '500':
 *         description: Error occurred
 */
exports.updateChild = async (req, res, next) => {
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
      let updatedTeacher = await childrenschema.findById(id);
  
      if (!updatedTeacher) {
        return res.status(404).json({ message: 'Teacher not found' });
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
 * /children:
 *   delete:
 *     summary: Delete a child
 *     tags:
 *       - children
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
 *         description: Child deleted successfully
 *       '404':
 *         description: Child not found
 *       '500':
 *         description: Error occurred
 */
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
