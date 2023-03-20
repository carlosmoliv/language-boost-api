import express, { Router } from "express";
import adminsRouter from "./admin.routes";
import coursesRouter from "./course.routes";
import studentsRouter from "./student.routes";
import tutorsRouter from "./tutor.routes";
import modulesRouter from "./modules.routes";

const api: Router = express.Router();

api.use("/students", studentsRouter);
api.use("/tutors", tutorsRouter);
api.use("/admins", adminsRouter);
api.use("/courses", coursesRouter);
api.use("/modules", modulesRouter);

export default api;
