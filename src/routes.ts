import express, { Router } from "express";
import usersRouter from "./modules/users/users.routes";

const api: Router = express.Router();

api.use("/", usersRouter);

export default api;
