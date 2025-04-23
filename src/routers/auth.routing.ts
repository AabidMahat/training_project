import express from "express";
import authController from "../controllers/auth.controller";
import { authMiddleware, roleBasedAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.logInuser);

router.route("/verify-account").post(authController.verifyAccount);
router.route("/resend-otp").post(authController.resendOtp);

router.route("/forget-password").post(authController.forgetPassword);
router.route("/reset-password/:resetToken").post(authController.resetPassword);

router
  .route("/get-users")
  .get(authMiddleware, roleBasedAuth("admin"), authController.getAllUser);

router.route("/chnage-status/:userId").post(
  authMiddleware,
  roleBasedAuth("admin"),

  authController.changeActiveStatus
);
export { router as authRouting };
