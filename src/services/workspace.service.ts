import { getRepository } from "typeorm";
import { User } from "../models/user.model";
import { Workspace } from "../models/workspace.model";
import workspaceRepository from "../repository/workspace.repository";
import workspaceUserRepository from "../repository/workspaceUser.repository";
import Document from "../models/document.model";
import documentService from "./document.service";

class WorkspaceService {
  async createWorkspace(workspaceData: Partial<Workspace>, user: User) {
    console.log({ workspaceData, user });
    const workspace = await workspaceRepository.createWorkspace(workspaceData);

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

  // async addDocumentToWorkspace(
  //   workspaceId: string,
  //   documentId: number,
  //   userId: number
  // ) {
  //   const document = await documentService.getDocumentById(documentId, userId);

  //   console.log({
  //     workspaceId,
  //   });

  //   return await workspaceRepository.addDocumentToWorkspace(
  //     workspaceId,
  //     document
  //   );
  // }
}

export default new WorkspaceService();
