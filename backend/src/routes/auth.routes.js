import { Router } from "express";
import { customSignup, googleSignup } from "../controllers/auth.controller.js";
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

export default router;
