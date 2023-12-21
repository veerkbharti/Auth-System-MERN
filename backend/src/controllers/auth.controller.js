import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import otpGenerator from "otp-generator";
import axios from "axios";


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

    res
      .status(200)
      .json({ success: true, message: "User signup successfully" });
  } catch (error) {
    console.log(error);
    return next();
  }
};

export const googleSignup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const token = await req.user.getJWTToken();
    res.redirect(`http://localhost:3000?token=${token}`);
  } catch (error) {
    console.log(error);
    return next();
  }
};

export const login = async (req, res, next) => {
  try {
    const { mobile } = req.body;
    const user = await User.findOne({ mobile });
    if (!user)
      return next(new ErrorHandler(`Mobile number not registered`, 404));

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    const response = await axios.get(
      `https://www.fast2sms.com/dev/bulkV2?authorization=${
        process.env.FAST_2_SMS_API_KEY
      }&route=otp&variables_values=${otp}&flash=0&numbers=${mobile}`
    );

    // const data = response.json();

    if (response.data.return === true) {
      const token = await user.getJWTToken();
      user.otp = { otpNumber: otp, expiresAt: new Date(Date.now() + 600000) };
      await user.save();

      res.status(200).json({
        success: true,
        message: "Otp sent to your mobile number",
        token,
      });
    }
    res.status(411).json({
      success: false,
      message: response.data.message,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

