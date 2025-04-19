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

  async forgetPassword(email: string) {
    return getRepository(User).findOne({
      where: {
        email,
      },
    });
  }

  async resetPassword(id: number, password: string) {
    return await getRepository(User).update(
      {
        id,
      },
      {
        password,
        passwordChangeAt: new Date(),
      }
    );
  }

  async verifyOtp(otp: string) {
    return await getRepository(User).findOne({
      where: {
        otp,
      },
    });
  }

  async saveUser(user: User) {
    return await getRepository(User).save(user);
  }

  async getAllUser() {
    return await getRepository(User).find();
  }
}

export default new UserRepository();
