import express from "express";
import { authMiddleware, roleBasedAuth } from "../middleware/auth.middleware";
import workspaceUser from "../controllers/workspaceuser.controller";

const router = express();

router.use(authMiddleware);

router.route("/addUser/:workspaceId").post(workspaceUser.addUserToWorkspace);

export { router as workspaceUserRouter };
