import { Request, Response } from "express";
import workspaceService from "../services/workspace.service";
import { AuthRequest } from "../utils/authRequest.utils";
import { User } from "../models/user.model";
import AppError from "../utils/appError.utils";

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

  async deleteWorkspace(req: Request, res: Response) {
    try {
      const user = (req as AuthRequest).user as User;
      const workspace = await workspaceService.removeWorkspace(
        req.params.workspaceId,
        user.id
      );

      if (!workspace) {
        throw new AppError("Cannot perform this action", 503);
      }

      res.status(203).json({
        message: "Workspace Removed",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }
  async getOwnerWorkspaceData(req: Request, res: Response) {
    try {
      const user = (req as AuthRequest).user as User;
      const ownerWorkspaces = await workspaceService.getOwnerWorkspace(user.id);

      if (!ownerWorkspaces) {
        res.status(500).json({
          message: "No Workspace found",
        });
        return;
      }

      res.status(200).json({
        message: "Workspace Found",
        data: ownerWorkspaces,
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async updateWorkspace(req: Request, res: Response) {
    try {
      const workspace = await workspaceService.updateWOrkspace(
        req.params.workspaceId,
        req.body.name,
        req.body.isPrivate
      );

      if (!workspace.affected) {
        res.status(501).json({
          message: "Error while updating data",
        });
        return;
      }
      res.status(203).json({
        message: "Data updated Suceesfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",

        err: (error as Error).message,
      });
    }
  }
}

export default new WorkspaceController();
