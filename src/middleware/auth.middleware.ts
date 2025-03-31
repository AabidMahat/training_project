import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.config";
import authService from "../services/auth.service";
import { User } from "../models/user.model";

interface Decoded {
  email: string;
  id: number;
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = "";
    if (
      req.header("Authorization") &&
      req.header("Authorization")?.startsWith("Bearer")
    ) {
      token = req.header("Authorization")?.split(" ")[1]!;
    }

    if (!token) {
      res.status(401).json({
        message: "You are not LoggedIn. Please Login to continue",
      });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & Decoded;

    const freshUser = (await authService.getUserById(decoded.id)) as User;

    if (!freshUser) {
      res.status(401).json({
        message: "User with this token no longer exists",
      });
      return;
    }

    if (freshUser.chnagePasswordAfter(decoded.iat!)) {
      res.status(401).json({
        message: "User has changed the password. Please Relogin again",
      });
      return;
    }

    (req as AuthRequest).user = freshUser;

    next();
  } catch (err) {
    console.log((err as JsonWebTokenError).message);
  }
};

const roleBasedAuth = (...requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthRequest).user as User;

    if (!requiredRoles.includes(user.role)) {
      res.status(403).json({
        message:
          "Acess denied.. You dont have permission to perform this action",
      });
      return;
    }

    next();
  };
};

export { authMiddleware, roleBasedAuth };
