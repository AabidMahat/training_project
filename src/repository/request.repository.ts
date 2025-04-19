import { getRepository } from "typeorm";
import { Request, Status } from "../models/request.model";
import AppError from "../utils/appError.utils";

class RequestRepository {
  async createRequest(request: Partial<Request>) {
    const newRequest = getRepository(Request).create(request);
    return await getRepository(Request).save(newRequest);
  }

  async approveRequest(userId: number, workspaceId: string) {
    const request = await getRepository(Request).findOne({
      where: {
        user: {
          id: userId,
        },
        workspace: {
          id: workspaceId,
        },
      },
    });

    if (request?.status === Status.Approved) {
      throw new AppError("Request is already Approved", 500);
    }

    request!.status = Status.Approved;

    return await getRepository(Request).save(request!);
  }

  async rejectRequest(userId: number, workspaceId: string) {
    const request = await getRepository(Request).findOne({
      where: {
        user: {
          id: userId,
        },
        workspace: {
          id: workspaceId,
        },
      },
    });

    request!.status = Status.Rejected;

    return await getRepository(Request).save(request!);
  }

  async showAllRequests() {
    return await getRepository(Request).find({
      relations: ["user", "workspace"],
    });
  }

  async requestByWorkspace() {
    const request = await getRepository(Request)
      .createQueryBuilder("request")
      .leftJoinAndSelect("request.workspace", "workspace")
      .orderBy("workspace.id")
      .getMany();

    const requestData = request.reduce((result: any, current) => {
      const workspaceId = current.workspace.id;
      const workspaceName = current.workspace.name;

      if (!result[workspaceId]) {
        result[workspaceId] = {
          workspaceId,
          workspaceName,
          request: [],
        };
      }

      result[workspaceId].request.push({
        requestId: current.id,
        requestStatus: current.status,
      });

      return result;
    }, {});

    return requestData;
  }
}

export default new RequestRepository();
