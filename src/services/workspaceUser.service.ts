import { getRepository } from "typeorm";
import { User } from "../models/user.model";
import workspaceRepository from "../repository/workspace.repository";
import workspaceUserRepository from "../repository/workspaceUser.repository";
import requestService from "./request.service";
import { Request } from "../models/request.model";
import authRepository from "../repository/auth.repository";
import activityService from "./activity.service";

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

  async addWorkspaceUser(
    workspaceId: string,
    userId: number,
    requestedRole: string
  ) {
    const workspace = await workspaceRepository.getWorkspaceById(workspaceId);
    const user = (await authRepository.getUserById(userId)) as User;
    if (!workspace) {
      throw new Error("This workspace no longer exists");
    }

    await activityService.logWorkspaceActivity(
      "add-workspace-user",
      userId,
      workspaceId
    );

    return await workspaceUserRepository.createWorkUser({
      role: requestedRole,
      user,
      workspace,
    });
  }

  async removeUserFromWorkspace(workspaceId: string, userId: number) {
    await activityService.logWorkspaceActivity(
      "remove-workspace-user",
      userId,
      workspaceId
    );

    return await workspaceUserRepository.removeUserFromWorkspace(
      userId,
      workspaceId
    );
  }

  async getUserByWorkspace(workspaceId: string) {
    return await workspaceUserRepository.getUserByWorkspaceId(workspaceId);
  }

  async getUserByWorkspaceGroup() {
    return await workspaceUserRepository.getUserByWorkspace();
  }
}

export default new WorkspaceUserService();
