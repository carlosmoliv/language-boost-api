import { getModelForClass } from "@typegoose/typegoose";
import { Admin } from "./admins/admins.model";
import { Student } from "./students/students.model";
import { Tutor } from "./tutors/tutors.model";
import { User } from "./users/users.model";

const userModel = getModelForClass(User);
const tutorsModel = getModelForClass(Tutor);
const adminsModel = getModelForClass(Admin);
const studentsModel = getModelForClass(Student);

export { userModel, tutorsModel, adminsModel, studentsModel };
