import { Response, Request } from "express";
import requestService from "../services/request.service";

class RequestController {
  async approveRequest(req: Request, res: Response) {
    try {
      const { workspaceId, userId } = req.params;
      const request = await requestService.approveRequest(+userId, workspaceId);

      if (!request) {
        res.status(403).json({
          message: "Something went wrong ..Please wait",
        });
        return;
      }

      res.status(202).json({
        message: "Admin Approved your Request",
        data: request,
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async rejectRequest(req: Request, res: Response) {
    try {
      const { workspaceId, userId } = req.params;
      const request = await requestService.rejectRequest(+userId, workspaceId);

      if (!request) {
        res.status(403).json({
          message: "Something went wrong ..Please wait",
        });
        return;
      }

      res.status(202).json({
        message: "Admin Rejected your Request",
        data: request,
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async removeUserFromWorkspaceRequest(req: Request, res: Response) {
    try {
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async showAllRequest(req: Request, res: Response) {
    try {
      const requests = await requestService.showAllRequests();

      if (requests.length === 0) {
        res.status(404).json({
          message: "No Request Found",
        });
        return;
      }

      res.status(200).json({
        message: "Request Fetched",
        data: requests,
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async requestByWorkspaceGroup(req: Request, res: Response) {
    try {
      const requestData = await requestService.showRequestByWorkspace();

      if (!requestData) {
        res.status(404).json({
          message: "No Request found",
        });
        return;
      }

      res.status(200).json({
        message: "Request Fetched",
        data: requestData,
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }
}

export default new RequestController();
