import { getRepository } from "typeorm";
import { Activity } from "../models/activity.model";

class ActivityRepository {
  async logActivity(activity: Partial<Activity>) {
    const newActivity = getRepository(Activity).create(activity);
    return getRepository(Activity).save(newActivity);
  }

  async getAllActivity() {
    return await getRepository(Activity)
      .createQueryBuilder("activity")
      .leftJoinAndSelect("activity.user", "user")
      .leftJoinAndSelect("activity.document", "document")
      .select([
        "activity.id",
        "activity.action",
        "activity.timestamp",
        "user.id",
        "user.name",
        "user.email",
        "document.id",
        "document.title",
      ])
      .getMany();
  }
}
export default new ActivityRepository();
