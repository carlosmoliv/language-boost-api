import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error)
      return res.status(400).json({
        status: "error",
        name: "ValidationError",
        message: error.details[0].message,
      });

    return next();
  };
};
