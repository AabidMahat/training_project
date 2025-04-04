import { User } from "../models/user.model";
import { Workspace } from "../models/workspace.model";
import workspaceRepository from "../repository/workspace.repository";
import workspaceUserRepository from "../repository/workspaceUser.repository";
import activityService from "./activity.service";

class WorkspaceService {
  async createWorkspace(workspaceData: Partial<Workspace>, user: User) {
    console.log({ workspaceData, user });
    const workspace = await workspaceRepository.createWorkspace({
      ...workspaceData,
      owner: user,
    });

    await activityService.logWorkspaceActivity(
      "create-workspace",
      user.id,
      workspace.id
    );

    await workspaceUserRepository.createWorkUser({
      user,
      workspace,
      role: "admin",
    });

    return workspace;
  }

  async getUserWorkspace(userId: number) {
    return await workspaceRepository.getUserWorkspace(userId);
  }

  async getUserandDocumentByWorkspaceId(workspaceId: string) {
    return await workspaceRepository.getUserandDocumentByWorkspaceId(
      workspaceId
    );
  }

  async getAllWorkspace() {
    return await workspaceRepository.getAllWorkspace();
  }

  async removeWorkspace(workspaceId: string, userId: number) {
    await activityService.logWorkspaceActivity(
      "create-workspace",
      userId,
      workspaceId
    );

    return await workspaceRepository.deleteWorkspace(workspaceId);
  }

  async getOwnerWorkspace(ownerId: number) {
    return await workspaceRepository.getOwnerWorkspace(ownerId);
  }
}

export default new WorkspaceService();
