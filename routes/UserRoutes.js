const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const { signAccessToken } = require("../helpers/jwtHelper");
const { authSchema, loginSchema } = require("../helpers/validationSchemas/userValidationSchema");

router.post("/register", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    let user = await global?.models?.USER?.findOne({ email: result.email });

    if (user) throw (createError.Conflict("user already Exits"));

    let newUser = new global.models.USER(result);
    let newUserInDB = await newUser.save();

    return res?.status(200)?.json({
      payload: {
        newUser: newUserInDB,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync(req.body);

    const user = await global.models.USER.findOne({
      email: result.email,
    });

    if (!user) throw createError.NotFound("User not found");

    const isMatch = await (await global.models.USER.findOne({
      email: result.email,
    }).select('+password'))
		.isValidPassword(result.password);

    if (!isMatch) throw createError.Unauthorized("password is invalid");

    let token = await signAccessToken(user?._doc);

    // let dataResult = new AuthToken(
    //   "ok",
    //   "Admin record found successfully",
    //   200,
    //   admin,
    //   token
    // );

    return res?.status(200).json({
			payload: {
				user,
				token: token
			}
		});
  } catch (err) {
    next(err);
  }
});


module.exports = {
  UserRoutes: router,
};
