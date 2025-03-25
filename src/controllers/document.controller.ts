import { Request, Response } from "express";
import documentService from "../services/document.service";
import { AuthRequest } from "../utils/authRequest.utils";

class DocumentController {
  async createDocument(req: Request, res: Response) {
    try {
      const loggedInUser = (req as AuthRequest).user;

      console.log(req.file);
      let filePath = "";
      if (req.file) {
        filePath = req.file.path; // Get the file path
      }

      const document = await documentService.createDocument({
        ...req.body,
        documentUrl: filePath,
        user: loggedInUser,
      });

      if (!document) {
        res.status(404).json({
          messgae: "Error while creating document",
        });
        return;
      }

      res.status(200).json({
        message: "Document created successfully",
        data: document,
      });
    } catch (err) {
      res.status(404).json({
        message: "Something went wrong",
        err: (err as Error).stack,
      });
    }
  }
}

export default new DocumentController();
