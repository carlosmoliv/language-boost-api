import express, { Router } from "express";
import adminsRouter from "./admins/admin.routes";
import coursesRouter from "./courses/course.routes";
import studentsRouter from "./students/student.routes";
import tutorsRouter from "./tutors/tutor.routes";

const api: Router = express.Router();

api.use("/students", studentsRouter);
api.use("/tutors", tutorsRouter);
api.use("/admins", adminsRouter);
api.use("/courses", coursesRouter);

export default api;
