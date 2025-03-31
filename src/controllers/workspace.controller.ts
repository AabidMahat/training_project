import { Request, Response } from "express";
import workspaceService from "../services/workspace.service";
import { AuthRequest } from "../utils/authRequest.utils";
import { User } from "../models/user.model";

class WorkspaceController {
  async createWorkspace(req: Request, res: Response) {
    try {
      const loogedInuser = (req as AuthRequest).user as User;

      const workspace = await workspaceService.createWorkspace(
        req.body,
        loogedInuser
      );

      if (!workspace) {
        res.status(404).json({
          message: "Cannot create workspace",
        });
        return;
      }

      res.status(200).json({
        message: "Workspace created",
        data: workspace,
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async getuserWorkspaces(req: Request, res: Response) {
    try {
      const workSpace = await workspaceService.getUserWorkspace(
        +req.params.userId
      );

      if (workSpace.length === 0) {
        res.status(404).json({
          message: "No workspace for User",
        });
        return;
      }

      res.status(200).json({
        message: "Workspace fetched",
        length: workSpace.length,
        data: workSpace,
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async getAllWorkspace(req: Request, res: Response) {
    try {
      const workspaces = await workspaceService.getAllWorkspace();

      if (workspaces.length === 0) {
        res.status(203).json({
          message: "No Workspace created",
        });
        return;
      }

      res.status(200).json({
        message: "Workspace Found",
        data: workspaces,
      });
    } catch (err) {
      res.status(404).json({
        message: "Something went wrong",
        err: (err as Error).message,
      });
    }
  }

  async getWorkspaceById(req: Request, res: Response) {
    try {
      const data = await workspaceService.getUserandDocumentByWorkspaceId(
        req.params.workspaceId
      );

      if (!data) {
        res.status(404).json({
          message: "No Workspace with this Id",
        });
        return;
      }

      res.status(200).json({
        message: "Workspace details fetched",
        data,
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  // async addDocumentToWorkSpace(req: Request, res: Response) {
  //   try {
  //     const user = (req as AuthRequest).user as User;
  //     const { workspaceId, documentId } = req.params;

  //     const workspace = await workspaceService.addDocumentToWorkspace(
  //       workspaceId,
  //       +documentId,
  //       user.id
  //     );

  //     if (!workspace.affected) {
  //       res.status(404).json({
  //         message: "Document is not added",
  //       });
  //       return;
  //     }

  //     res.status(200).json({
  //       message: "Document Added",
  //     });
  //   } catch (error) {
  //     res.status(404).json({
  //       message: "Something went wrong",
  //       err: (error as Error).message,
  //     });
  //   }
  // }
}

export default new WorkspaceController();
