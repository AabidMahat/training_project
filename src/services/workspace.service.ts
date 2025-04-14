import { Workspace } from "./../models/workspace.model";
import { getRepository } from "typeorm";
import { User } from "../models/user.model";
import workspaceRepository from "../repository/workspace.repository";
import workspaceUserRepository from "../repository/workspaceUser.repository";
import activityService from "./activity.service";
import AppError from "../utils/appError.utils";

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
    const isOwnerPresent = await getRepository(Workspace).findOne({
      where: {
        id: workspaceId,
        owner: {
          id: userId,
        },
      },
    });

    if (!isOwnerPresent) {
      throw new AppError("Only Owner can delete Workspace", 500);
    }

    await activityService.logWorkspaceActivity(
      "delete-workspace",
      userId,
      workspaceId
    );
    // return isOwnerPresent;
    return await workspaceRepository.deleteWorkspace(workspaceId);
  }

  async getOwnerWorkspace(ownerId: number) {
    return await workspaceRepository.getOwnerWorkspace(ownerId);
  }
  async updateWOrkspace(workspaceId: string, name: string, isPrivate: boolean) {
    return await workspaceRepository.updateWorkspace(
      workspaceId,
      name,
      isPrivate
    );
  }
}

export default new WorkspaceService();
