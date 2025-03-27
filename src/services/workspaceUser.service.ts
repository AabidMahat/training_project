import { getRepository } from "typeorm";
import { User } from "../models/user.model";
import workspaceRepository from "../repository/workspace.repository";
import workspaceUserRepository from "../repository/workspaceUser.repository";

class WorkspaceUserService {
  async getAllWorkspaceUser() {
    return await workspaceUserRepository.getAllWorkspaceUser();
  }

  async addUserToWorkspace(workspaceId: string, user: User) {
    const workspace = await workspaceRepository.getWorkspaceById(workspaceId);

    if (!workspace) {
      throw new Error("This workspace no longer exists");
    }

    return await workspaceUserRepository.createWorkUser({
      role: user.role,
      user,
      workspace,
    });
  }

  async removeUserFromWorkspace(workspaceId: string, userId: number) {
    return await workspaceUserRepository.removeUserFromWorkspace(
      userId,
      workspaceId
    );
  }
}

export default new WorkspaceUserService();
