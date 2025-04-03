import { Request, Response } from "express";
import documentService from "../services/document.service";
import { AuthRequest } from "../utils/authRequest.utils";
import { User } from "../models/user.model";

class DocumentController {
  async createDocument(req: Request, res: Response) {
    try {
      const loggedInUser = (req as AuthRequest).user as User;

      console.log(req.file);
      let filePath = "";
      if (req.file) {
        filePath = req.file.path; // Get the file path
      }

      const document = await documentService.createDocument(
        {
          ...req.body,
          documentUrl: filePath,
          user: loggedInUser,
        },
        loggedInUser.id
      );

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

  async getDocumentById(req: Request, res: Response) {
    try {
      const user = (req as AuthRequest).user as User;
      const document = await documentService.getDocumentById(
        +req.params.documentId,
        user.id
      );

      res.status(200).json({
        message: "Document Fetched",
        data: document,
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async addDocumentToWorkSpace(req: Request, res: Response) {
    try {
      const { workspaceId } = req.params;

      const loggedInUser = (req as AuthRequest).user;

      console.log(req.file);

      let filePath = "";
      if (req.file) {
        filePath = req.file.path; // Get the file path
      }

      const newDocument = await documentService.createDocument(
        {
          ...req.body,
          documentUrl: filePath,
          user: loggedInUser,
        },
        loggedInUser!.id
      );

      const document = await documentService.addDocumentToWorkspace(
        workspaceId,
        newDocument.id
      );

      if (!document) {
        res.status(404).json({
          message: "Document is not added",
        });
        return;
      }

      res.status(200).json({
        message: "Document Added",
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async deleteDocument(req: Request, res: Response) {
    try {
      const document = await documentService.deleteDocument(
        +req.params.documentId
      );

      if (!document.affected) {
        res.status(403).json({
          message: "Cannot Delete Document",
        });
        return;
      }

      res.status(203).json({
        message: "document deleted successfully",
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }
}

export default new DocumentController();
