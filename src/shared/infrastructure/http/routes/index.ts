import express, { Router } from "express";
import adminsRouter from "./admins/admins.routes";
import studentsRouter from "./students/students.routes";
import tutorsRouter from "./tutors/tutors.routes";

const api: Router = express.Router();

api.use("/students", studentsRouter);
api.use("/tutors", tutorsRouter);
api.use("/admins", adminsRouter);

export default api;
