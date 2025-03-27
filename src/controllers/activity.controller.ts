import { Request, Response } from "express";
import activityService from "../services/activity.service";

class ActivityController {
  async getAllActivity(req: Request, res: Response) {
    try {
      const activities = await activityService.getActivities();

      if (activities.length === 0) {
        res.status(404).json({
          message: "No Activity Recorded",
        });
        return;
      }

      res.status(200).json({
        message: "Activity fetched",
        length: activities.length,

        data: activities,
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }
}

export default new ActivityController();
