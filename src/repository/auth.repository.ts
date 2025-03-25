import { getRepository } from "typeorm";
import { User } from "../models/user.model";

class UserRepository {
  async createUser(user: Partial<User>) {
    const newUser = getRepository(User).create(user);
    return await getRepository(User).save(newUser);
  }

  async getUserByEmail(email: string) {
    return await getRepository(User).findOne({
      where: {
        email,
      },
    });
  }

  async getUserById(userId: number) {
    return await getRepository(User).findOne({
      where: {
        id: userId,
      },
    });
  }
}

export default new UserRepository();
