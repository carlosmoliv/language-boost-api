import { getModelForClass } from "@typegoose/typegoose";

import { Admin } from "./admins/infrastructure/mongo/models/Admin";
import { Course } from "./courses/infrastructure/mongo/models/Course";
import { Lesson } from "./lessons/infrastructure/mongo/models/Lesson";
import { Module } from "./module/Infrastructure/mongo/models/Module";
import { Student } from "./students/infrastructure/mongo/models/Student";
import { Tutor } from "./tutors/infrastructure/mongo/models/Tutor";
import { User } from "./users/infrastructure/mongo/models/User";

const userModel = getModelForClass(User);
const tutorModel = getModelForClass(Tutor);
const adminModel = getModelForClass(Admin);
const studentModel = getModelForClass(Student);
const courseModel = getModelForClass(Course);
const lessonModel = getModelForClass(Lesson);
const moduleModel = getModelForClass(Module);

export {
  userModel,
  tutorModel,
  adminModel,
  studentModel,
  courseModel,
  lessonModel,
  moduleModel,
};
