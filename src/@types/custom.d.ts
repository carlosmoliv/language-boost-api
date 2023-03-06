import { Role } from "../modules/users/users.enums";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        role: Role;
      };
    }
  }
}
