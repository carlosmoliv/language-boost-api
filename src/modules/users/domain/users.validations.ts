import Joi from "joi";
import { AppError } from "../../../shared/errors/AppError";
import { usersModel } from "../../models";
import { User } from "../infrastructure/mongo/models/User";

export const createUserSchema = Joi.object<User>({
  name: Joi.string().max(30).required().messages({
    "any.required": "Name is a required field.",
  }),
  password: Joi.string()
    .trim()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required(),
  email: Joi.string()
    .email()
    .required()
    .external(async (email: string) => {
      const user = await usersModel.findOne({ email: email });

      if (user)
        throw new AppError(
          "UserConflictError",
          "User already exists with the provided email address.",
          409
        );

      return null;
    }),
});
