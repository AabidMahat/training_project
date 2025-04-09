import express from "express";
import { authMiddleware, roleBasedAuth } from "../middleware/auth.middleware";
import requestController from "../controllers/request.controller";

const router = express.Router();

router.use(authMiddleware);

router
  .route("/approve/:workspaceId/:userId")
  .post(roleBasedAuth("admin"), requestController.approveRequest);

router
  .route("/showRequest")
  .get(roleBasedAuth("admin"), requestController.showAllRequest);

router
  .route("/getRequestByWorkspace")
  .get(requestController.requestByWorkspaceGroup);

export { router as requestRouting };
