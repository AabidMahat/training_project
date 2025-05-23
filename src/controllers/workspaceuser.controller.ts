import { Request, Response } from "express";
import workspaceUserService from "../services/workspaceUser.service";
import { AuthRequest } from "../utils/authRequest.utils";
import { User } from "../models/user.model";
import workspaceService from "../services/workspace.service";
import AppError from "../utils/appError.utils";

class WorkSpaceuUerController {
  async getAllWorkspaceUser(req: Request, res: Response) {
    try {
    } catch (error) {}
  }

  async sendRequestToWorkspace(req: Request, res: Response) {
    try {
      const user = (req as AuthRequest).user as User;
      const { workspaceId } = req.params;

      const workspaceUser = await workspaceUserService.sendRequestToWorkspace(
        workspaceId,
        user,
        { ...req.body }
      );

      if (!workspaceUser) {
        res.status(404).json({
          message: "Cannot create workspace user",
        });
        return;
      }
      res.status(200).json({
        message: "Please wait Admin will Response to your Request",
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async removeUserFromWorkspace(req: Request, res: Response) {
    try {
      const { workspaceId, userId } = req.params;
      const workspaceUser = await workspaceUserService.removeUserFromWorkspace(
        workspaceId,
        +userId
      );

      if (!workspaceUser) {
        res.status(402).json({
          message: "Error while removing user",
        });
        return;
      }

      res.status(202).json({
        message: "User removed Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        err: (error as Error).stack,
      });
    }
  }

  async getUserByWorkspace(req: Request, res: Response) {
    try {
      const workspaceUsers = await workspaceUserService.getUserByWorkspace(
        req.params.workspaceId
      );

      if (workspaceUsers.length === 0) {
        res.status(503).json({
          message: "No user found",
        });
        return;
      }

      res.status(200).json({
        message: "Active users",
        data: workspaceUsers,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async getUserByWorkspaceGroup(req: Request, res: Response) {
    try {
      const data = await workspaceUserService.getUserByWorkspaceGroup();

      if (!data) {
        res.status(404).json({
          message: "No Data Found",
        });
        return;
      }

      res.status(200).json({
        message: "Data Fetched",
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }
}

export default new WorkSpaceuUerController();
