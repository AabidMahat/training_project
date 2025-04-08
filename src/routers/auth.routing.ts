import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.logInuser);

router.route("/forget-password").post(authController.forgetPassword);
router.route("/reset-password/:resetToken").post(authController.resetPassword);

export { router as authRouting };
