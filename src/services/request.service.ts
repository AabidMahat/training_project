import { Request } from "../models/request.model";
import requestRepository from "../repository/request.repository";
import workspaceUserService from "./workspaceUser.service";

class RequestService {
  async createRequest(request: Partial<Request>) {
    return requestRepository.createRequest(request);
  }

  async approveRequest(userId: number, workspaceId: string) {
    const request = await requestRepository.approveRequest(userId, workspaceId);

    const workspaceUser = await workspaceUserService.addWorkspaceUser(
      workspaceId,
      userId,
      request.requested_role
    );

    console.log({
      workspaceUser,
    });
    return request;
  }

  async rejectRequest(userId: number, workspaceId: string) {
    return await requestRepository.rejectRequest(userId, workspaceId);
  }

  async showAllRequests() {
    return await requestRepository.showAllRequests();
  }
}

export default new RequestService();
