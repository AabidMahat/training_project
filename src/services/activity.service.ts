import { Activity } from "../models/activity.model";
import Document from "../models/document.model";
import { User } from "../models/user.model";
import activityLogRepository from "../repository/activityLog.repository";
import authService from "./auth.service";
import documentService from "./document.service";

class ActivityService {
  async logActivity(action: string, userId: number, documentId: number) {
    const user = (await authService.getUserById(userId)) as User;
    const document = (await documentService.getDocumentById(
      documentId,
      userId
    )) as Document;

    return await activityLogRepository.logActivity({ action, user, document });
  }

  async getActivities() {
    return await activityLogRepository.getAllActivity();
  }
}

export default new ActivityService();
