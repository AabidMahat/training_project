import express from "express";
import { authMiddleware, roleBasedAuth } from "../middleware/auth.middleware";
import requestController from "../controllers/request.controller";

const router = express.Router();

router.use(authMiddleware);

router
  .route("/approve/:workspaceId/:userId")
  .post(roleBasedAuth("admin"), requestController.approveRequest);

export { router as requestRouting };
