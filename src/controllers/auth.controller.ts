import { Request, Response } from "express";
import userService from "../services/auth.service";
import authService from "../services/auth.service";
import authRepository from "../repository/auth.repository";
import AppError from "../utils/appError.utils";
import { sendMail } from "../utils/email.utils";

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

  async verifyAccount(req: Request, res: Response) {
    try {
      const user = await authService.verifyUser(req.body.otp);

      if (!user) {
        res.status(404).json({
          message: "Invalid Otp",
        });
        return;
      }

      res.status(200).json({
        message: "User verfied successfully",
      });
    } catch (error) {
      res.status(500).json({
        err: (error as Error).message,
      });
    }
  }

  async resendOtp(req: Request, res: Response) {
    try {
      const user = await authService.resendOtp(req.body.email);
      if (!user) {
        res.status(404).json({
          message: "No User found",
        });
        return;
      }

      res.status(200).json({
        message: "Otp Resend Successfully",
      });
    } catch (error) {
      res.status(500).json({
        err: (error as Error).message,
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

  async forgetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await authService.forgetPassword(email);

      if (!user) {
        throw new AppError("No user with this email", 404);
      }
      res.status(200).json({
        message: "Forgot Password mail Send to Your inbox",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { resetToken } = req.params;
      const { password } = req.body;

      console.log({
        resetToken,
      });

      const user = await authService.resetPassword(resetToken, password);

      if (!user) {
        throw new AppError("No user with this email", 404);
      }

      res.status(200).json({
        message: "Password Reset Successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        err: (error as Error).message,
      });
    }
  }

  async getAllUser(req: Request, res: Response) {
    try {
      const users = await authService.getAllUser();

      if (!users) {
        res.status(404).json({
          message: "No user found",
        });
        return;
      }

      res.status(200).json({
        message: "User fetched",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        err: (error as Error).message,
      });
    }
  }

  async changeActiveStatus(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { isActive } = req.body;
      const user = await authService.changeStatus(+userId, isActive);

      if (!user) {
        res.status(404).json({
          message: "Error while updating user",
        });
        return;
      }

      res.status(200).json({
        message: "Status Changed Successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        err: (error as Error).message,
      });
    }
  }
}

export default new UserController();
