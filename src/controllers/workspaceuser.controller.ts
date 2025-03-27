import { Request, Response } from "express";
import workspaceUserService from "../services/workspaceUser.service";
import { AuthRequest } from "../utils/authRequest.utils";
import { User } from "../models/user.model";

class WorkSpaceuUerController {
  async getAllWorkspaceUser(req: Request, res: Response) {
    try {
    } catch (error) {}
  }

  async addUserToWorkspace(req: Request, res: Response) {
    try {
      const user = (req as AuthRequest).user as User;
      const { workspaceId } = req.params;
      const workspaceUser = await workspaceUserService.addUserToWorkspace(
        workspaceId,
        user
      );

      if (!workspaceUser) {
        res.status(404).json({
          message: "Cannot create workspace user",
        });
        return;
      }
      res.status(200).json({
        message: "User added to workspace",
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

      if (!workspaceUser.affected) {
        res.status(402).json({
          message: "Error while removing user",
        });
        return;
      }

      res.status(202).json({
        message: "User removed Successfully",
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }
}

export default new WorkSpaceuUerController();
