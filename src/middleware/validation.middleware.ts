import { NextFunction, Request, Response } from "express";
import Joi, { ValidationError } from "joi";

export const validator =
  (schema: Joi.ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      return next();
    } catch (error) {
      if (error instanceof ValidationError)
        return res.status(400).json({
          status: "error",
          name: "ValidationError",
          message: error.details[0].message,
        });

      return next(error);
    }
  };
