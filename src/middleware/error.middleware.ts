import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError.utils";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error 💥 ", err.message);

  if (err instanceof AppError) {
    res.status(err.statuscode).json({
      status: "error",
      err: err.message,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};
