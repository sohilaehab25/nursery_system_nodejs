const jwt = require("jsonwebtoken");
require('dotenv').config(); 

/**
 * @swagger
 * /api/users/test:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Test authorization
 *     tags: [User]
 *     description: Use to test authorization JWT
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */
module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("authorization");
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }
    console.log(authHeader);
    const token = authHeader.split(" ")[1];

    const secretKey = process.env.SECRETKEY; 
    let decodedToken = jwt.verify(token, secretKey);
    req.token = decodedToken;
    next();
  } catch (error) {
    error.message = "You are not authorized";
    next(error);
  }
};

/**
 * Middleware function to check if the user is an admin
 */
/**
 * Middleware function to check if the user is an admin
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   security:
 *     - bearerAuth: []
 *   responses:
 *     200:
 *       description: Success
 *     401:
 *       description: Unauthorized
 *     500:
 *       description: Internal server error
 */
module.exports.isAdmin = (req, res, next) => {
  if (req.token.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

/**
 * Middleware function to check if the user is a teacher
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   security:
 *     - bearerAuth: []
 *   responses:
 *     200:
 *       description: Success
 *     401:
 *       description: Unauthorized
 *     500:
 *       description: Internal server error
 */
module.exports.isTeacher = (req, res, next) => {
  if (req.token.role === "teacher") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
