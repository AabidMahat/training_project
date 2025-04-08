import { getRepository } from "typeorm";
import { Activity } from "../models/activity.model";
import { User } from "../models/user.model";

class ActivityRepository {
  async logActivity(activity: Partial<Activity>) {
    const newActivity = getRepository(Activity).create(activity);
    return getRepository(Activity).save(newActivity);
  }

  async getAllActivity(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await getRepository(Activity).find({
      relations: ["user", "document", "workspace"],
      skip,
      take: limit,
    });
  }
}

export default new ActivityRepository();
