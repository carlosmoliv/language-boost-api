import { getModelForClass } from "@typegoose/typegoose";

import { Admin } from "./admins/infrastructure/mongo/models/Admin";
import { Student } from "./students/infrastructure/mongo/models/Student";
import { Tutor } from "./tutors/infrastructure/mongo/tutors.model";
import { User } from "./users/infrastructure/mongo/models/User";

const usersModel = getModelForClass(User);
const tutorsModel = getModelForClass(Tutor);
const adminsModel = getModelForClass(Admin);
const studentsModel = getModelForClass(Student);

export { usersModel, tutorsModel, adminsModel, studentsModel };
