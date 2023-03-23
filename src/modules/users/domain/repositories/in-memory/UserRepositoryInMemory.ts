import crypto from "node:crypto";

import { Role } from "../../user.enums";
import { User } from "../../../infrastructure/mongo/models/User";
import { Admin } from "../../../infrastructure/mongo/models/Admin";
import { Student } from "../../../infrastructure/mongo/models/Student";
import { Tutor } from "../../../infrastructure/mongo/models/Tutor";
import { ICreateUser } from "../../dtos/ICreateUser.dto";
import { IUserRepository } from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];
  private tutors: Tutor[] = [];
  private admins: Admin[] = [];
  private students: Student[] = [];

  async findByEmailAndRole(email: string, role: Role): Promise<User | null> {
    return (
      this.users.find(
        (user) => user.email === email && user.role === role && user.active
      ) ?? null
    );
  }

  async findByIdAndRole(userId: string, role: Role): Promise<User | null> {
    return (
      this.users.find(
        (user) => user.id === userId && user.role === role && user.active
      ) ?? null
    );
  }

  async createUserStudent(data: ICreateUser) {
    const userId = crypto.randomUUID();
    const studentId = crypto.randomUUID();

    const user = new User();
    const student = new Student();

    Object.assign(user, {
      ...data,
      _id: userId,
      active: true,
      role: Role.student,
      student: studentId,
    });

    this.users.push(user);

    Object.assign(student, {
      _id: studentId,
      userId: userId,
    });

    this.students.push(student);

    return user;
  }

  async createUserTutor(data: ICreateUser) {
    const userId = crypto.randomUUID();
    const tutorId = crypto.randomUUID();

    const user = new User();
    const tutor = new Tutor();

    Object.assign(user, {
      ...data,
      active: true,
      role: Role.tutor,
      tutor: tutorId,
    });

    this.users.push(user);

    Object.assign(tutor, {
      _id: tutorId,
      userId: userId,
    });

    this.tutors.push(tutor);

    return user;
  }

  async createUserAdmin(data: ICreateUser) {
    const userId = crypto.randomUUID();
    const adminId = crypto.randomUUID();

    const user = new User();
    const admin = new Admin();

    Object.assign(user, {
      ...data,
      active: true,
      role: Role.admin,
      admin: adminId,
    });

    this.users.push(user);

    Object.assign(admin, {
      _id: adminId,
      userId: userId,
    });

    this.admins.push(admin);

    return user;
  }
}
