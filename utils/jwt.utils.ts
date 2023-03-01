import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "shhhhh";

export const createToken = (payload: object | string | Buffer) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "5h" });

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);
