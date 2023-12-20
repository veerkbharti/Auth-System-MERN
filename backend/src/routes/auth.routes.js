import { Router } from "express";
import { customSignup } from "../controllers/auth.controller.js";

const router = Router();

router.route("/auth/custom-signup").post(customSignup);

export default router;