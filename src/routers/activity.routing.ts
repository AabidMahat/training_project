import express from "express";
import { authMiddleware, roleBasedAuth } from "../middleware/auth.middleware";
import activityController from "../controllers/activity.controller";

const router = express();

// router.use(authMiddleware, roleBasedAuth("admin"));

router.route("/").get(activityController.getAllActivity);

export { router as activityRouter };
