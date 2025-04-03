import express from "express";
import workspaceController from "../controllers/workspace.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authMiddleware);

router.route("/").post(workspaceController.createWorkspace);

router.route("/").get(workspaceController.getAllWorkspace);

// router.route("/addDocument/:workspaceId/:documentId").patch(workspaceController.addDocumentToWorkSpace);

router.route("/:userId").get(workspaceController.getuserWorkspaces);

router
  .route("/getWorkspace/:workspaceId")
  .get(workspaceController.getWorkspaceById);

router
  .route("/remove/:workspaceId")
  .delete(workspaceController.deleteWorkspace);

router.route("/ownerWorkspace").get(workspaceController.getOwnerWorkspace);

export { router as workSpaceRouting };
