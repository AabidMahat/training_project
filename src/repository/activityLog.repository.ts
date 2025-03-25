import { getRepository } from "typeorm";
import { Activity } from "../models/activity.model";

class ActivityRepository {
  async logActivity(activity: Partial<Activity>) {
    const newActivity = getRepository(Activity).create(activity);
    return getRepository(Activity).save(newActivity);
  }
}
export default new ActivityRepository();
