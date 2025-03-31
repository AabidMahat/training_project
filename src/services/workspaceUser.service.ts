import { getRepository } from "typeorm";
import { User } from "../models/user.model";
import workspaceRepository from "../repository/workspace.repository";
import workspaceUserRepository from "../repository/workspaceUser.repository";
import requestService from "./request.service";
import { Request } from "../models/request.model";
import authRepository from "../repository/auth.repository";

class WorkspaceUserService {
  async getAllWorkspaceUser() {
    return await workspaceUserRepository.getAllWorkspaceUser();
  }

  async sendRequestToWorkspace(
    workspaceId: string,
    user: User,
    requestData: Partial<Request>
  ) {
    const workspace = await workspaceRepository.getWorkspaceById(workspaceId);

    if (!workspace) {
      throw new Error("This workspace no longer exists");
    }

    const request = await requestService.createRequest({
      ...requestData,
      user,
      workspace,
    });

    return request;
  }

  async addWorkspaceUser(workspaceId: string, userId: number) {
    const workspace = await workspaceRepository.getWorkspaceById(workspaceId);
    const user = (await authRepository.getUserById(userId)) as User;
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
