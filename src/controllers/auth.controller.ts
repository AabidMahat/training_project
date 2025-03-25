import { Request, Response } from "express";
import userService from "../services/auth.service";
import authService from "../services/auth.service";

class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const isUserPresent = await userService.getUserByEmail(req.body.email);
      if (isUserPresent) {
        res.status(404).json({
          message: "User with this email already exists",
        });
        return;
      }

      const user = await userService.registerUser({ ...req.body });

      if (!user) {
        res.status(404).json({
          message: "Error while creating user",
        });
        return;
      }

      res.status(200).json({
        message: "User created Successfully",
        data: user,
      });
    } catch (err) {
      res.status(404).json({
        message: "Error while creating user",
        err: (err as Error).message,
      });
    }
  }

  async logInuser(req: Request, res: Response) {
    try {
      const { token, user } = await authService.login(
        req.body.email,
        req.body.password
      );

      res.status(200).json({
        message: "Login Successful",
        data: user,
        token,
      });
    } catch (err) {
      res.status(404).json({
        message: "Error while creating user",
        err: (err as Error).message,
      });
    }
  }
}

export default new UserController();
