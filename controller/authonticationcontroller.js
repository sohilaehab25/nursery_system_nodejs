const teacherschema = require("../model/teacherModel")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     description: Authenticate user credentials and generate JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The full name of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       '200':
 *         description: Authentication successful. Returns JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating successful authentication.
 *                 token:
 *                   type: string
 *                   description: JWT token for accessing protected routes.
 *       '401':
 *         description: Unauthorized. Invalid credentials.
 *       '500':
 *         description: Internal server error.
 */
exports.login = async (req, res, next) => {
    try {
        const secretKey = process.env.SECRETKEY;

        // Extracting username and password from request body
        const { fullname, password } = req.body;

        // Find user by fullname
        const user = await teacherschema.findOne({ fullname });

        // If user not found, send error response
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Hash the provided password for comparison
        const ispasswordValid = await bcrypt.compare(password, user.password);

        // If password is not valid, send error response
        if (!ispasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({
            _id: user._id,
            role: user.role
        }, secretKey, { expiresIn: "2hr" });

        // Send success response with token
        res.status(200).json({ message: "Authenticated", token });
    } catch (error) {
        console.error("Login error:", error);
        // Pass any errors to the error handling middleware
        next(error);
    }
};


exports.login = async (req, res, next) => {
    try {
        const secretKey = process.env.SECRETKEY;

        // Extracting username and password from request body
        const { fullname, password } = req.body;
        // console.log("Login attempt with:", fullname, password);

        // Find user by fullname
        const user = await teacherschema.findOne({ fullname });


        // If user not found, send error response
        if (!user) {
            console.log("User not found");
            throw new Error("User not found");
        }
        console.log(user);

        // Hash the provided password for comparison
        const ispasswordValid = await bcrypt.compare(password, user.password);
        // console.log(ispasswordValid);

        // If password is not valid, send error response
        if (!ispasswordValid) {
            console.log("Invalid password:", password);
            throw new Error("Invalid password");
        }

        // Generate JWT token
        const token = jwt.sign({
            _id: user._id,
            role: user.role
        }, secretKey
        , { expiresIn: "2hr" });

        // Send success response with token
        res.json({ message: "Authenticated", token });
    } catch (error) {
        console.error("Login error:", error);
        // Pass any errors to the error handling middleware
        next(error);
    }
};



