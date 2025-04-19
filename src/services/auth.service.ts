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
import { sendMail, sendVerifyAccountMail } from "../utils/email.utils";
import { generate } from "otp-generator";

const generateRandomOtp = () =>
  generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

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
      otp: generateRandomOtp(),
      isVerified: false,
    });

    await sendVerifyAccountMail(newUser.email, newUser.otp);

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

    if (!user.isVerified) {
      throw new AppError("Please verify the account", 500);
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

  async verifyUser(otp: string) {
    const user = await userRepository.verifyOtp(otp);

    if (!user) {
      throw new AppError("Invalid Otp", 500);
    }
    user.isVerified = true;

    return await userRepository.saveUser(user);
  }

  async resendOtp(email: string) {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw new AppError("No user with this email", 500);
    }

    if (user.isVerified) {
      throw new AppError("User is already verified", 500);
    }

    user.otp = generateRandomOtp();

    await sendVerifyAccountMail(user.email, user.otp);

    return await userRepository.saveUser(user);
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

  async getAllUser() {
    return await authRepository.getAllUser();
  }
}

export default new UserService();
