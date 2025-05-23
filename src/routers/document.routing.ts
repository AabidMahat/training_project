import express from "express";
import documentController from "../controllers/document.controller";
import { authMiddleware, roleBasedAuth } from "../middleware/auth.middleware";
import uploads from "../utils/multer.utils";

const router = express.Router();

router.use(authMiddleware, roleBasedAuth("editor", "admin"));

router.route("/all-documents").get(documentController.getAllDocuments);

router.route("/:documentId").get(documentController.getDocumentById);

router
  .route("/")
  .post(uploads.single("file"), documentController.createDocument);

router
  .route("/addDocument/:workspaceId")
  .post(uploads.single("file"), documentController.addDocumentToWorkSpace);

router.route("/:documentId/:userId").delete(documentController.deleteDocument);

router.route("/update/:documentId").patch(documentController.updateDocument);

router
  .route("/getOwnerDocument/:userId")
  .get(documentController.getOwnerDocuments);

router
  .route("/change-status/:documentId")
  .patch(documentController.changeDocumentStatus);

export { router as documentRouting };
