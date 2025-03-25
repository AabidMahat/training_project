import express from "express";
import documentController from "../controllers/document.controller";
import { authMiddleware, roleBasedAuth } from "../middleware/auth.middleware";
import uploads from "../utils/multer.utils";

const router = express.Router();

router.use(authMiddleware, roleBasedAuth("editor", "admin"));

router
  .route("/")
  .post(uploads.single("file"), documentController.createDocument);

export { router as documentRouting };
