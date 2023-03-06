import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../../utils/jwt.utils";
import { logger } from "../../utils/logger.utils";
import { userModel } from "../modules/models";
import { Role } from "../modules/users/users.enums";

export const authMiddleware =
  (allowedRoles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    try {
      const token = authorization?.replace("Bearer ", "");
      if (!token)
        return res.status(401).json({
          name: "AuthorizationError",
          status: "error",
          message: "Token is missing.",
        });

      const decoded = verifyToken(token) as JwtPayload;

      return userModel.findById(decoded.userId).then((user) => {
        if (!user)
          return res.status(401).json({
            name: "AuthorizationError",
            status: "error",
            message:
              "Unauthorized request. The user associated with the provided authentication token was not found in the system.",
          });

        req.user = {
          id: user.id,
          role: user.role,
        };

        if (!allowedRoles.includes(user.role))
          return res.status(401).json({
            name: "AuthorizationError",
            status: "error",
            message:
              "Unauthorized request. User role is not authorized for this action.",
          });

        return next();
      });
    } catch (error) {
      logger.error(error);

      const errorMessage =
        error instanceof JsonWebTokenError ? "Invalid Token" : "Unauthorized";

      return res
        .status(401)
        .json({ name: "InvalidToken", status: "error", message: errorMessage });
    }
  };
