import express, { Router } from "express";
import adminsRouter from "./admin.routes";
import coursesRouter from "./course.routes";
import studentsRouter from "./student.routes";
import tutorsRouter from "./tutor.routes";
import modulesRouter from "./module.routes";
import lessonsRouter from "./lesson.routes";
import ordersRouter from "./order.routes";

const api: Router = express.Router();

api.use("/students", studentsRouter);
api.use("/tutors", tutorsRouter);
api.use("/admins", adminsRouter);
api.use("/courses", coursesRouter);
api.use("/modules", modulesRouter);
api.use("/lessons", lessonsRouter);
api.use("/orders", ordersRouter);

export default api;
