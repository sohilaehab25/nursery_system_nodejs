const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    let token = req.get("authorization").split(" ")[1];
  //console.log(token);
  console.log("##############")
  let decoded_token = jwt.verify(token, "nursery system");
  console.log("**************")
  console.log(decoded_token);
    req.token = decoded_token;
    next();
  } catch (error) {
    error.message = "not Athenticated";
    next(error);
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.token.role == "admin") next();
  else next(new Error("not Authorizatied"));
};

module.exports.isteacher = (req, res, next) => {
  if (req.token.role == "teacher") next();
  else next(new Error("not Authorizatied"));
};
