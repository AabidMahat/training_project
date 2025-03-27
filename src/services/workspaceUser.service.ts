import { User } from "../models/user.model";
import workspaceRepository from "../repository/workspace.repository";
import workspaceUserRepository from "../repository/workspaceUser.repository";

class WorkspaceUserService {
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
}

export default new WorkspaceUserService();
