import { getRepository } from "typeorm";
import { Workspace } from "../models/workspace.model";
import documentRepository from "./document.repository";
import Document from "../models/document.model";
import workspaceUserRepository from "./workspaceUser.repository";

class WorkSpaceRepository {
  async createWorkspace(workspace: Partial<Workspace>) {
    const newWorkSpace = getRepository(Workspace).create(workspace);
    return await getRepository(Workspace).save(newWorkSpace);
  }

  async getUserWorkspace(userId: number) {
    return await getRepository(Workspace)
      .createQueryBuilder("work")
      .leftJoinAndSelect("work.workspaceUser", "workspaceUser")
      .leftJoinAndSelect("work.document", "documents")
      .where("workspaceUser.userId  = :userId", { userId })
      .getMany();
  }

  async addDocumentToWorkspace(workspaceId: string, document: Document) {
    console.log({
      workspaceId,
    });

    const getWorkSpaceDocuments =
      (await documentRepository.getWorkspaceDocuments(workspaceId)) || [];

    console.log({ getWorkSpaceDocuments, document });

    const workspace = await getRepository(Workspace).findOne({
      where: {
        id: workspaceId,
      },
    });

    document.workspace = workspace!;

    await documentRepository.saveDocument(document);

    //No need

    return await getRepository(Workspace).update(
      {
        id: workspaceId,
      },
      {
        document: [...getWorkSpaceDocuments, document],
      }
    );
  }

  async getWorkspaceById(workspaceId: string) {
    return await getRepository(Workspace).findOne({
      where: {
        id: workspaceId,
      },
      relations: ["document", "workspaceUser"],
    });
  }

  async getUserandDocumentByWorkspaceId(workspaceId: string) {
    const workspace = await getRepository(Workspace).findOne({
      where: {
        id: workspaceId,
      },
      relations: ["document"],
    });

    const workspaceUser = await workspaceUserRepository.getDataByWorkspaceId(
      workspaceId
    );

    return { ...workspace, workspaceUser };
  }

  async getAllWorkspace() {
    return await getRepository(Workspace).find({
      relations: ["document", "workspaceUser"],
    });
  }
}

export default new WorkSpaceRepository();
