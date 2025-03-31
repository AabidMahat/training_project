import { Response, Request } from "express";
import requestService from "../services/request.service";
import { AuthRequest } from "../utils/authRequest.utils";
import { User } from "../models/user.model";

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
}

export default new RequestController();
