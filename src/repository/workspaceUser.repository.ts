import { getRepository } from "typeorm";
import { WorkSpaceUser } from "../models/workspaceUser.model";

class WorkSpaceSUserRepository {
  async getAllWorkspaceUser() {
    return await getRepository(WorkSpaceUser).find();
  }

  async createWorkUser(workUser: Partial<WorkSpaceUser>) {
    const newWorkSpace = getRepository(WorkSpaceUser).create(workUser);
    return await getRepository(WorkSpaceUser).save(newWorkSpace);
  }

  async getDataByWorkspaceId(workspaceId: string) {
    return await getRepository(WorkSpaceUser).find({
      where: {
        workspace: {
          id: workspaceId,
        },
      },
      relations: ["user"],
    });
  }

  async getWorkSpaceUserById(userId: number, workspaceId: string) {
    return await getRepository(WorkSpaceUser).findOne({
      where: {
        user: {
          id: userId,
        },
        workspace: {
          id: workspaceId,
        },
      },
    });
  }

  async getUserByWorkspaceId(workspaceId: string) {
    return await getRepository(WorkSpaceUser).find({
      where: {
        workspace: {
          id: workspaceId,
        },
      },
      relations: ["user"],
    });
  }

  async removeUserFromWorkspace(userId: number, workspaceId: string) {
    const workspaceUserRepository = getRepository(WorkSpaceUser);


    

    const workspaceUser = await workspaceUserRepository.findOne({
      where: {
        workspace: { id: workspaceId },
        user: { id: userId },
      },
    });

    if (workspaceUser) {
      return await workspaceUserRepository.remove(workspaceUser);
    } else {
      throw new Error("User not found in workspace.");
    }
  }
}
export default new WorkSpaceSUserRepository();
