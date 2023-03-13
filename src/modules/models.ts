import { getModelForClass } from "@typegoose/typegoose";

import { Admin } from "./admins/infrastructure/mongo/models/Admin";
import { Student } from "./students/infrastructure/mongo/models/Student";
import { Tutor } from "./tutors/infrastructure/mongo/models/Tutor";
import { User } from "./users/infrastructure/mongo/models/User";

const userModel = getModelForClass(User);
const tutorModel = getModelForClass(Tutor);
const adminModel = getModelForClass(Admin);
const studentModel = getModelForClass(Student);
const courseModel = getModelForClass(Student);
const lessonModel = getModelForClass(Student);

export { userModel, tutorModel, adminModel, studentModel, courseModel };
