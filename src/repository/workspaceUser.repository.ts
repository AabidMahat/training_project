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

  async removeUserFromWorkspace(userId: number, workspaceId: string) {
    return await getRepository(WorkSpaceUser).delete({
      workspace: {
        id: workspaceId,
      },
      user: {
        id: userId,
      },
    });
  }
}
export default new WorkSpaceSUserRepository();
