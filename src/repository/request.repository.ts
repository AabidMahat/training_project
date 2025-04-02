import { getRepository } from "typeorm";
import { Request } from "../models/request.model";

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

    if (request?.status === "approved") {
      throw new Error("Request is already Approved");
    }

    request!.status = "approved";

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

    request!.status = "rejected";

    return await getRepository(Request).save(request!);
  }

  async showAllRequests() {
    return await getRepository(Request).find({
      relations: ["user", "workspace"],
    });
  }
}

export default new RequestRepository();
