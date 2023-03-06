import express, { Router } from "express";
import adminsRouter from "./modules/admins/admins.routes";
import studentsRouter from "./modules/students/students.routes";
import tutorsRouter from "./modules/tutors/tutors.routes";
import { Role } from "./modules/users/users.enums";

const api: Router = express.Router();

api.use("/students", studentsRouter);
api.use("/tutors", tutorsRouter);
api.use("/admins", adminsRouter);

export default api;
