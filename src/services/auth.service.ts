import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import userRepository from "../repository/auth.repository";
import { validate } from "class-validator";
import authRepository from "../repository/auth.repository";
import { JWT_SECRET } from "../config/jwt.config";

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
}

export default new UserService();
