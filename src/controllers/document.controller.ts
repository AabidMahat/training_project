import { NextFunction, Request, Response } from "express";
import documentService from "../services/document.service";
import { AuthRequest } from "../utils/authRequest.utils";
import { User } from "../models/user.model";
import AppError from "../utils/appError.utils";

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

  async getDocumentById(req: Request, res: Response, next: NextFunction) {
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
      res.status(500).json({
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
        // throw new AppError("Document Not Added", 503);
        res.status(404).json({
          message: "Document is not added",
        });
        return;
      }

      res.status(200).json({
        message: "Document Added",
      });
    } catch (error) {
      // throw new AppError("Something went wrong", 500);
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async deleteDocument(req: Request, res: Response) {
    try {
      const document = await documentService.deleteDocument(
        +req.params.documentId,
        +req.params.userId
      );
      console.log(document);

      if (!document) {
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

  async updateDocument(req: Request, res: Response) {
    try {
      const user = (req as AuthRequest).user as User;

      const document = await documentService.updateDocument(
        +req.params.documentId,
        req.body.content,
        user.id
      );

      if (!document.affected) {
        res.status(404).json({
          message: "Data is not updated",
        });
        return;
      }

      res.status(202).json({
        message: "Document Updated",
      });
    } catch (error) {
      res.status(404).json({
        message: "Someting went wrong",
        err: (error as Error).message,
      });
    }
  }

  async getOwnerDocuments(req: Request, res: Response) {
    try {
      // const user = (req as AuthRequest).user as User;
      const ownerDocuments = await documentService.getOwnerDocuments(
        +req.params.userId
      );

      if (ownerDocuments.length === 0) {
        throw new AppError("No Document is created", 503);
      }

      res.status(200).json({
        messgae: "Document Fetched",
        data: ownerDocuments,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async changeDocumentStatus(req: Request, res: Response) {
    try {
      const { documentId } = req.params;
      const { status } = req.body;

      const document = await documentService.changeDocumentStatus(
        +documentId,
        status
      );

      if (!document.affected) {
        res.status(404).json({
          message: "No document with this id",
        });
        return;
      }

      res.status(202).json({
        message: "Document updated successfully",
        data: document,
      });
    } catch (error) {
      res.status(500).json({
        err: (error as Error).message,
      });
    }
  }

  async getAllDocuments(req: Request, res: Response) {
    try {
      const documents = await documentService.getAllDocuments();

      console.log({
        documents,
      });

      if (documents.length === 0) {
        res.status(404).json({
          message: "No Document found",
        });
        return;
      }

      res.status(200).json({
        message: "Document fetched",
        data: documents,
      });
    } catch (error) {
      res.status(500).json({
        err: (error as Error).message,
      });
    }
  }
}

export default new DocumentController();
