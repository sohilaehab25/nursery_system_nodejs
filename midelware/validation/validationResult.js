const { validationResult } = require("express-validator");
module.exports = (req, res, next) => {
  let result = validationResult(req);
  console.log(req.body);

  if (result.errors.length > 0) {
    let errorMsg = result.errors.reduce(
      (current, item) => current + item.msg + " : ",
      ""
    );
    let error = new Error(errorMsg);
    error.status = 422;
    next(error);
  } else next();
};
