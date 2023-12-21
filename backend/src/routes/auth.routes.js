import { Router } from "express";
import {
  customSignup,
  googleSignup,
  login,
  otpVerify,
} from "../controllers/auth.controller.js";
import passport from "passport";

const router = Router();

router.route("/auth/custom-signup").post(customSignup);
router.route("/auth/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router
  .route("/auth/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    googleSignup
  );
router.route("/auth/login").post(login);
router.route("/auth/verify-otp").post(otpVerify);

export default router;
