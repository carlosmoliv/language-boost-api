import { getModelForClass } from "@typegoose/typegoose";

import { Admin } from "./users/infrastructure/mongo/models/Admin";
import { Course } from "./courses/infrastructure/mongo/models/Course";
import { Lesson } from "./courses/infrastructure/mongo/models/Lesson";
import { Module } from "./courses/infrastructure/mongo/models/Module";
import { Item } from "./orders/infrastructure/mongo/models/Item";
import { Order } from "./orders/infrastructure/mongo/models/Order";
import { Student } from "./users/infrastructure/mongo/models/Student";
import { Tutor } from "./users/infrastructure/mongo/models/Tutor";
import { User } from "./users/infrastructure/mongo/models/User";

const userModel = getModelForClass(User);
const tutorModel = getModelForClass(Tutor);
const adminModel = getModelForClass(Admin);
const studentModel = getModelForClass(Student);
const courseModel = getModelForClass(Course);
const lessonModel = getModelForClass(Lesson);
const moduleModel = getModelForClass(Module);
const orderModel = getModelForClass(Order);
const itemModel = getModelForClass(Item);

export {
  userModel,
  tutorModel,
  adminModel,
  studentModel,
  courseModel,
  lessonModel,
  moduleModel,
  orderModel,
  itemModel,
};
