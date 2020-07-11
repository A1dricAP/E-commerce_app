exports.userSignupValidator = (req, res, next) => {
  //using (next) to move to the other parts of the applcation, otherwise app will hault
  req.check("name", "Name is required. ").notEmpty();
  req
    .check("email", "Email is required. ")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });
  req.check("password", "password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be minimum 6 chars long")
    .matches(/\d/)
    .withMessage("Password must contain atleast 1 digit");
  const errors = req.validationErrors();
  if (errors) {
    const firsterror = errors.map((error) => error.msg)[0];
    return res.status(400).json({
      error: firsterror,
    });
  }
  next(); //core concept of having a middleware. Anytime a middleware is created, we need to have next()
};
