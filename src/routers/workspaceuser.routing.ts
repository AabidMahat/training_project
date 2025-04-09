import express from "express";
import { authMiddleware, roleBasedAuth } from "../middleware/auth.middleware";
import workspaceUser from "../controllers/workspaceuser.controller";
import workspaceuserController from "../controllers/workspaceuser.controller";

const router = express();

router.use(authMiddleware);

router
  .route("/sendRequest/:workspaceId")
  .post(workspaceUser.sendRequestToWorkspace);

router
  .route("/removeUser/:workspaceId/:userId")
  .delete(workspaceUser.removeUserFromWorkspace);

router
  .route("/getUserByWorkspaceId/:workspaceId")
  .get(workspaceUser.getUserByWorkspace);

router
  .route("/getUserByWorkspacesGroup")
  .get(workspaceuserController.getUserByWorkspaceGroup);

export { router as workspaceUserRouter };
