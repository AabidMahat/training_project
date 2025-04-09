import { WorkSpaceUser } from "./../models/workspaceUser.model";
import { getRepository } from "typeorm";

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

  async getUserByWorkspace() {
    const data = await getRepository(WorkSpaceUser)
      .createQueryBuilder("workspaceUser")
      .leftJoinAndSelect("workspaceUser.user", "user")
      .leftJoinAndSelect("workspaceUser.workspace", "workspace")

      .orderBy("workspace.id")
      .getMany();

    console.log(data);

    const groupData = data.reduce((result: any, current) => {
      const workspaceId = current.workspace.id;
      const workspaceName = current.workspace.name;

      if (!result[workspaceId]) {
        result[workspaceId] = {
          workspaceId,
          workspaceName,
          user: [],
        };
      }

      result[workspaceId].user.push({
        userId: current.user.id,
        userName: current.user.name,
        role: current.role,
      });

      console.log({
        result,
      });

      return result;
    }, {});
    return groupData;
  }
}
export default new WorkSpaceSUserRepository();
