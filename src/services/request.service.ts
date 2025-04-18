import { Request } from "../models/request.model";
import requestRepository from "../repository/request.repository";
import { sendWorkspaceNotification } from "../utils/email.utils";
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

    console.log(
      workspaceUser.workspace.owner.email,
      workspaceUser.user.name,
      workspaceUser.workspace.name,
      request.requested_role
    );

    await sendWorkspaceNotification(
      workspaceUser.workspace.owner.email,
      workspaceUser.user.name,
      workspaceUser.workspace.name,
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

  async showRequestByWorkspace() {
    return await requestRepository.requestByWorkspace();
  }
}

export default new RequestService();
