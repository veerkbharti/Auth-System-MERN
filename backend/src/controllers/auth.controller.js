import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const customSignup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(
        new ErrorHandler("Please enter a valid email and password", 400)
      );

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User already exist!!", 400));

    user = await User.create(req.body);

    res.json({ success: true, message: "User signup successfully" });
  } catch (error) {
    console.log(error);
    return next();
  }
};

export const googleSignup = async (req, res, next) => {
  try {
    const token = jwt.sign(
      { email: req.user.email, mobile: req.user.mobile },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.redirect(`http://localhost:3000?token=${token}`);
  } catch (error) {
    console.log(error);
    return next();
  }
};
