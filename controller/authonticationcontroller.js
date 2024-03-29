const teacherschema = require("../model/teacherModel")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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



// $2b$10$68.re8bI/fai.xL0TSxp3eKcwsGY6T1lRuufQKCj6lnMN6uXzEcs.
// $2b$10$68.re8bI/fai.xL0TSxp3eKcwsGY6T1lRuufQKCj6lnMN6uXzEcs.