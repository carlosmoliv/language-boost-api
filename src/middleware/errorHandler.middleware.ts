import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/errors.utils";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError)
    return res
      .status(err.statusCode)
      .json({ status: "error", name: err.name, message: err.message });

  return res.status(500).json({
    status: "error",
    name: "InternalServerError",
    message: `Looks like something went wrong - ${err.message}`,
  });
};
