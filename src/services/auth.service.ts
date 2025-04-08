import { getRepository } from "typeorm";
import crypto from "crypto";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import userRepository from "../repository/auth.repository";
import { validate } from "class-validator";
import authRepository from "../repository/auth.repository";
import { JWT_SECRET } from "../config/jwt.config";
import AppError from "../utils/appError.utils";
import { sendMail } from "../utils/email.utils";

class UserService {
  async registerUser(user: Partial<User>) {
    console.log({
      password: user.password,
      confirmPassword: user.confirmPassword,
    });

    if (user.password !== user.confirmPassword) {
      throw new Error("Password do not match");
    }
    const hashPassword = await bcrypt.hash(user.password!, 12);

    console.log({ hashPassword });

    // Convert userData into an instance of User (so class-validator works)
    const newUser = Object.assign(new User(), {
      ...user,
      password: hashPassword,
    });

    const errors = await validate(newUser);

    if (errors.length > 0) {
      throw new Error(
        `Validation failed: ${errors.map((e) => e.toString()).join(", ")}`
      );
    }

    return await userRepository.createUser(newUser);
  }

  async login(email: string, password: string) {
    const user = await authRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("Incorrect Email or Password");
    }

    console.log(await bcrypt.compare(password, user.password));

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Incorrect Email or Password");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return { token, user };
  }

  async getUserByEmail(email: string) {
    return await userRepository.getUserByEmail(email);
  }

  async getUserById(id: number) {
    return await userRepository.getUserById(id);
  }

  async forgetPassword(email: string) {
    const user = await authRepository.getUserByEmail(email);

    if (!user) {
      throw new AppError("No user with this email", 404);
    }

    const resetToken = crypto.createHash("sha256").digest("hex");

    user.resetToken = resetToken;

    await sendMail(user.email, resetToken);

    const userData = await getRepository(User).save(user);

    return userData;
  }

  async resetPassword(resetToken: string, password: string) {
    const user = await getRepository(User).findOne({
      where: {
        resetToken,
      },
    });

    if (!user) {
      throw new AppError("Invalid reset token", 401);
    }

    const hashPassword = await bcrypt.hash(password, 14);

    return await authRepository.resetPassword(user.id, hashPassword);
  }
}

export default new UserService();
