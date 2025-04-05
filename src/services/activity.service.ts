import { Activity } from "../models/activity.model";
import Document from "../models/document.model";
import { User } from "../models/user.model";
import { Workspace } from "../models/workspace.model";
import activityLogRepository from "../repository/activityLog.repository";
import workspaceRepository from "../repository/workspace.repository";
import authService from "./auth.service";
import documentService from "./document.service";

class ActivityService {
  async logDocumentActivity(
    action: string,
    userId: number,
    document:Document
  ) {
    const user = (await authService.getUserById(userId)) as User;
    

    return await activityLogRepository.logActivity({ action, user, document });
  }

  async logWorkspaceActivity(
    action: string,
    userId: number,
    workspaceId: string
  ) {
    const user = (await authService.getUserById(userId)) as User;
    const workspace = (await workspaceRepository.getWorkspaceById(
      workspaceId
    )) as Workspace;

    return await activityLogRepository.logActivity({ action, user, workspace });
  }

  async getActivities() {
    return await activityLogRepository.getAllActivity();
  }
}

export default new ActivityService();
