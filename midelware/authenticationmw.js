const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("authorization");
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }
    console.log(authHeader);
    const token = authHeader.split(" ")[1];

    console.log("##############")
    // let token = req.get("authorization").split(" ")[1];
    console.log(token);
  // console.log("##############")
  let decoded_token = jwt.verify(token, "nursery system");
  // console.log("**************")
  console.log(decoded_token);
    req.token = decoded_token;
    next();
  } catch (error) {
    error.message = "not Athenticated";
    next(error);
  }
};

module.exports.isAdmin = (req, res, next) => {
  console.log(req.token.role);
  if (req.token.role == "admin") next();
  else next(new Error("not Authorizatied"));
};

module.exports.isteacher = (req, res, next) => {
  if (req.token.role == "teacher") next();
  else next(new Error("not Authorizatied"));
};
